class Message < ApplicationRecord
  belongs_to :channel_user
  delegate :channel, to: :channel_user
  has_many :emojis, through: :reactions
end
