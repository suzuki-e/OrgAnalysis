class CreateEmojis < ActiveRecord::Migration[5.2]
  def change
    create_table :emojis, id: false do |t|
      t.string :id, null: false
      t.string :url, null: false

      t.timestamps
    end
    add_index :emojis, :id, unique: true
  end
end
