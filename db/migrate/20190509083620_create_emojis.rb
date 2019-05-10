class CreateEmojis < ActiveRecord::Migration[5.2]
  def change
    create_table :emojis do |t|
      t.string :slack_id, null: false
      t.string :url, null: false

      t.timestamps
    end
    add_index :emojis, :id, unique: true
  end
end
