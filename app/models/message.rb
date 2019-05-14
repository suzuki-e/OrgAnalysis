class Message < ApplicationRecord
  belongs_to :channel_user
  has_many :reactions
  has_many :emojis, through: :reactions
end
