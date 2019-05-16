class AddTimestampColumnToMessage < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :timestamp, :datetime, null: false
  end
end
