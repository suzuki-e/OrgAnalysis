class ChangeCreatedToBeBigintInChannels < ActiveRecord::Migration[5.2]
  def change
    change_column :channels, :created, :bigint
  end
end
