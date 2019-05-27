class AddMessagesCountToUsers < ActiveRecord::Migration[5.2]
  def self.up
    add_column :users, :messages_count, :integer, null: false, default: 0
  end

  def self.down
    remove_column :users, :messages_count
  end
end
