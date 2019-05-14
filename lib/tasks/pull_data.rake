require 'slack-ruby-client'
require 'json'

def print_pretty(json)
  json_str = JSON.pretty_generate(json)
  puts json_str
end

def slack_client
  return @client unless @client.nil?

  Slack.configure do |config|
    config.token = ENV['SLACK_API_TOKEN']
  end
  @client = Slack::Web::Client.new
end

namespace :pull_data do
  desc 'SlackAPIからデータを取得してローカルDBへ保存'

  task all: :environment do
    Rake::Task['pull_data:emoji'].execute
    Rake::Task['pull_data:user'].execute
    Rake::Task['pull_data:channel'].execute
    Rake::Task['pull_data:channel_user'].execute
    Rake::Task['pull_data:message'].execute
  end

  task emoji: :environment do
    puts 'emojiの保存を開始しました'
    emojis = slack_client.emoji_list.emoji
    emojis.each.with_index(1) do |emoji, i|
      name, url = emoji
      e = Emoji.find_or_initialize_by(slack_id: name)
      e.attributes = {
        url: url
      }
      e.save!
      puts i if (i % 1000).zero?
    end
    puts 'Finished'
  end

  task user: :environment do
    puts 'userの保存を開始しました'
    users = slack_client.users_list.members
    # TODO: Userの削除をどう扱うか。登録Userの削除を追うことが、現状できない
    users.each.with_index(1) do |user, i|
      # 不必要にユーザーを保存しないようにする
      next if user.deleted
      next if user.is_bot
      # デフォルトで存在するslackbotのユーザーIDは固定. user.is_botで引っかからない様子.
      next if user.id == 'USLACKBOT'

      u = User.find_or_initialize_by(slack_id: user.id)
      u.attributes = {
        name: user.name,
        deleted: user.deleted,
        real_name: user.real_name,
        email: user.profile.email,
        profile_image: user.profile.image_72,
        is_bot: user.is_bot
      }
      u.save!
      puts i if (i % 1000).zero?
    end
    puts 'Finished'
  end

  task channel: :environment do
    puts 'Channelの保存を開始しました'
    channels = slack_client.conversations_list(limit: 100_000,
                                               types: :public_channel,
                                               exclude_archived: true).channels
    channels.each.with_index(1) do |channel, i|
      # 不必要に保存しない
      # TODO: チャンネルがPublicからPrivateになったり、Archiveされた場合のトラックができない。
      next unless channel.is_channel
      next if channel.is_private
      next if channel.is_archived

      c = Channel.find_or_initialize_by(slack_id: channel.id)
      c.attributes = {
        name: channel.name,
        created: channel.created,
        is_archived: channel.is_archived,
        name_normalized: channel.name_normalized,
        is_private: channel.is_private,
        topic: channel.topic,
        purpose: channel.purpose
      }
      c.save!
      puts i if (i % 1000).zero?
    end
    puts 'Finished'
  end

  task channel_user: %i[environment channel user] do
    puts 'Channel毎のユーザ一覧の保存を開始しました'
    # TODO: pagination
    channels = slack_client.conversations_list(limit: 100000,
                                               types: :public_channel,
                                               exclude_archived: true).channels
    channels.each.with_index(1) do |channel, i|
      # 不必要に保存しない
      next unless channel.is_channel
      next if channel.is_private
      next if channel.is_archived

      c = Channel.find_by(slack_id: channel.id)
      member_ids = slack_client.conversations_members(channel: channel.id,
                                                      limit: 10000).members
      member_ids.each do |member_id|
        user = User.find_by(slack_id: member_id)
        # Botなど、UserDBに保存していないユーザーの場合はnilになるのでスキップする
        next if user.nil?

        # TODO: チャンネルから脱退したらどうなる？現状だと追えない
        ChannelUser.find_or_create_by!(user: user,
                                       channel: c,
                                       joined: true)
        puts i if (i % 1000).zero?
      end
    end
    puts 'Finished'
  end

  task message: %i[environment channel_user] do
    puts 'Channel毎のメッセージ一覧、リアクション一覧の保存を開始しました'
    per_channel_message_limit = 10
    channels = slack_client.conversations_list(limit: 100_000,
                                               types: :public_channel,
                                               exclude_archived: true).channels
    channels.each do |channel|
      # 不必要に保存しない
      next unless channel.is_channel
      next if channel.is_private
      next if channel.is_archived

      c = Channel.find_by!(slack_id: channel.id)

      begin
        messages_list = slack_client.conversations_history(channel: channel.id,
                                                           limit: per_channel_message_limit).messages
      rescue Slack::Web::Api::Errors::TooManyRequestsError => e
        # Slack APIの Limitationに触れたらやり直し
        # ref. https://api.slack.com/docs/rate-limits
        puts e
        puts 'Sleep 5 seconds.'
        sleep(5)
        retry
      end

      messages_list.each.with_index(1) do |message, i|
        # Channel Joinなどの自動メッセージをスキップする
        # ref. https://api.slack.com/events/message
        next if message.key?('subtype')

        # Userモデルからidを取得。
        user = User.find_by(slack_id: message.user)
        # Botなど、UserDBに保存していないユーザーはスキップする
        next if user.nil?

        channel_user = ChannelUser.find_by(user: user, channel: c)
        # 現在はチャンネルにJoinしていないけど、過去にJoinし、発言していた人向けに、channel_userレコードを作成
        if channel_user.nil?
          cu = ChannelUser.new
          cu.attributes = {
            user: user,
            channel: c,
            joined: false
          }
          cu.save!
          channel_user = cu
        end

        m = Message.find_or_initialize_by(channel_user_id: channel_user.id,
                                          ts: message.ts)
        m.attributes = {
          text: message.text
        }
        m.save!
        puts i if (i % 1000).zero?

        # リアクション(emoji)がある場合、その情報を取得
        next unless message.key?('reactions')

        reactions = message.reactions
        reactions.each do |reaction|
          emoji = Emoji.find_by(slack_id: reaction.name)
          if emoji.nil?
            e = Emoji.new
            e.attributes = {
              slack_id: reaction.name,
              url: ''
            }
            e.save!
            emoji = e
          end
          r = Reaction.find_or_create_by!(emoji_id: emoji.id,
                                          message_id: m.id)
          r.attributes = { count: reaction.fetch('count') }
          r.save!
        end
      end
    end
    puts 'Finished'
  end
end
