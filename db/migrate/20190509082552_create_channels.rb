class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :slack_id, null: false
      t.string :name, null: false
      t.integer :created, null: false
      t.boolean :is_archived, null: false, default: false
      t.string :name_normalized, null: false
      t.boolean :is_private, null: false, default: false
      t.string :topic, null: false
      t.string :purpose, null: false

      t.timestamps
    end
    add_index :channels, :id, unique: true
  end
end
