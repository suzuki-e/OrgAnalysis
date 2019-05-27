class AddUsersCountToChannels < ActiveRecord::Migration[5.2]
  def self.up
    add_column :channels, :users_count, :integer, null: false, default: 0
  end

  def self.down
    remove_column :channels, :users_count
  end
end
