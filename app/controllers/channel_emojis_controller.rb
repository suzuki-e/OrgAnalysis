# frozen_string_literal: true
class ChannelEmojisController < ApplicationController
  def index
    channel_id = params[:channel_id]
    results = Reaction.joins({ :message => { :channel_user => :channel } }).includes(:emoji).where(channels: { id: channel_id }).group(:emoji).order("sum_count DESC").sum(:count)
    json = results.map do |result|
      { emoji: result[0], count: result[1] }
    end
    render json: json
  end

  private

  def channel_emoji_params
    params.require(:channel_id)
  end
end
