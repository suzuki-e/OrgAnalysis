class RenameSlackIdToSlackNameInEmoji < ActiveRecord::Migration[5.2]
  def change
    rename_column :emojis, :slack_id, :slack_name
  end
end
