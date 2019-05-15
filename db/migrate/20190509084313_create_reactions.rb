class CreateReactions < ActiveRecord::Migration[5.2]
  def change
    create_table :reactions do |t|
      t.references :emoji, foreign_key: true
      t.references :message, foreign_key: true
      t.integer :count, null: false, default: 0

      t.timestamps
    end
  end
end
