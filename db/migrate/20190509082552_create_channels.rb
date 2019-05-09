class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels, id: false do |t|
      t.string :id, null: false
      t.string :name
      t.integer :created
      t.boolean :is_archived
      t.string :name_normalized
      t.boolean :is_private
      t.string :topic
      t.string :purpose

      t.timestamps
    end
    add_index :channels, :id, unique: true
  end
end
