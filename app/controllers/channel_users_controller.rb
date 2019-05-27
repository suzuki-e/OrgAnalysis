# frozen_string_literal: true
class ChannelUsersController < ApplicationController
  def index
    channel_id = channel_users_params.to_i
    channel_users = ChannelUser.includes(:user).where(channel_id: channel_id).order(messages_count: 'DESC')
    render json: channel_users.to_json(include: :user)
  end

  private

  def channel_users_params
    params.require(:channel_id)
  end
end
