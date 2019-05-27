class AddMessagesCountToChannelUsers < ActiveRecord::Migration[5.2]
  def self.up
    add_column :channel_users, :messages_count, :integer, null: false, default: 0
  end

  def self.down
    remove_column :channel_users, :messages_count
  end
end
