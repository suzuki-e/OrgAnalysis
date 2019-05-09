class CreateChannelUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :channel_users do |t|
      t.references :channel, foreign_key: true, type: :string
      t.references :user, foreign_key: true, type: :string

      t.timestamps
    end
  end
end
