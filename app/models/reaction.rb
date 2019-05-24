class Reaction < ApplicationRecord
  belongs_to :emoji
  belongs_to :message
  counter_culture :emoji, column_name: 'used_count', delta_column: 'count'
end
