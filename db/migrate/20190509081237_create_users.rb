class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :slack_id, null: false
      t.string :name, null: false
      t.boolean :deleted, null: false, default: false
      t.string :real_name, null: false
      t.string :email, null: false
      t.string :profile_image, null: false
      t.boolean :is_bot, null: false, default: false

      t.timestamps
    end
    add_index :users, :id, unique: true
  end
end
