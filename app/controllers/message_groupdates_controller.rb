class MessageGroupdatesController < ApplicationController
  def index
    channel_id = params[:channel_id]
    messages = channel_id.nil? ? Message.all : Channel.find(channel_id).messages
    groupdates = messages.group_by_hour(:timestamp).count
    render json: ChartjsLine.new(groupdates: groupdates).with_default_style
  end
end
