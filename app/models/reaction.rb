class Reaction < ApplicationRecord
  belongs_to :emoji
  belongs_to :message
end
