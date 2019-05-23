class MessageGroupdatesController < ApplicationController
  def index
    channel_id = params[:channel_id]
    messages = channel_id.blank? ? Message.all : Channel.find(channel_id).messages
    groupdates = messages.group_by_hour(:timestamp).count
    labels, data = line_chart_format(groupdates)
    render json: { labels: labels, data: data }
  end

  private

  def line_chart_format(groupdates)
    [groupdates.keys.map { |ts| I18n.l(ts, format: :short) }, groupdates.values]
  end
end
