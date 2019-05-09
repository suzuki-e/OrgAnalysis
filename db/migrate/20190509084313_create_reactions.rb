class CreateReactions < ActiveRecord::Migration[5.2]
  def change
    create_table :reactions do |t|
      t.references :emoji, foreign_key: true, type: :string
      t.references :message, foreign_key: true
      t.integer :count

      t.timestamps
    end
  end
end
