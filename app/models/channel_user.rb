class ChannelUser < ApplicationRecord
  belongs_to :channel
  belongs_to :user
  has_many :messages
  counter_culture :channel, column_name: 'users_count'
end
