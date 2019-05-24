# frozen_string_literal: true
class Emoji < ApplicationRecord
  has_many :reactions
  has_many :messages, through: :reactions
end
