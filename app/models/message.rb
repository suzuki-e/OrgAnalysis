class Message < ApplicationRecord
  belongs_to :channel_user
  delegate :channel, to: :channel_user
  delegate :user, to: :channel_user
  has_many :reactions
  has_many :emojis, through: :reactions
  counter_culture %i[channel_user channel], column_name: 'messages_count'
end
