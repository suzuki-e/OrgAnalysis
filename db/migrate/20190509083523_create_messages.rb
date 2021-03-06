class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.references :channel_user, foreign_key: true
      t.text :text, null: false
      t.string :ts, null: false

      t.timestamps
    end
  end
end
