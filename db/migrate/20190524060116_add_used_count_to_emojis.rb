class AddUsedCountToEmojis < ActiveRecord::Migration[5.2]
  def self.up
    add_column :emojis, :used_count, :integer, null: false, default: 0
  end

  def self.down
    remove_column :emojis, :used_count
  end
end
