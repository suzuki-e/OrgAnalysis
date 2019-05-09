class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users, id: false do |t|
      t.string :id, null: false
      t.string :name
      t.boolean :deleted
      t.string :real_name
      t.string :email
      t.string :profile_image
      t.boolean :is_bot

      t.timestamps
    end
    add_index :users, :id, unique: true
  end
end
