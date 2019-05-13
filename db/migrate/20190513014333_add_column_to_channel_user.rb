class AddColumnToChannelUser < ActiveRecord::Migration[5.2]
  def change
    add_column :channel_users, :joined, :boolean, null: false, default: false
  end
end
