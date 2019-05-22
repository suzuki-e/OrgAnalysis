class AddMessagesCountToChannels < ActiveRecord::Migration[5.2]
  def self.up
    add_column :channels, :messages_count, :integer, null: false, default: 0
  end

  def self.down
    remove_column :channels, :messages_count
  end
end
