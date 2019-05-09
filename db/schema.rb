# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_09_084313) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channel_users", force: :cascade do |t|
    t.string "channel_id"
    t.string "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_channel_users_on_channel_id"
    t.index ["user_id"], name: "index_channel_users_on_user_id"
  end

  create_table "channels", id: false, force: :cascade do |t|
    t.string "id", null: false
    t.string "name"
    t.integer "created"
    t.boolean "is_archived"
    t.string "name_normalized"
    t.boolean "is_private"
    t.string "topic"
    t.string "purpose"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["id"], name: "index_channels_on_id", unique: true
  end

  create_table "emojis", id: false, force: :cascade do |t|
    t.string "id", null: false
    t.string "url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["id"], name: "index_emojis_on_id", unique: true
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "channel_user_id"
    t.text "text"
    t.string "ts"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_user_id"], name: "index_messages_on_channel_user_id"
  end

  create_table "reactions", force: :cascade do |t|
    t.string "emoji_id"
    t.bigint "message_id"
    t.integer "count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["emoji_id"], name: "index_reactions_on_emoji_id"
    t.index ["message_id"], name: "index_reactions_on_message_id"
  end

  create_table "users", id: false, force: :cascade do |t|
    t.string "id", null: false
    t.string "name"
    t.boolean "deleted"
    t.string "real_name"
    t.string "email"
    t.string "profile_image"
    t.boolean "is_bot"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["id"], name: "index_users_on_id", unique: true
  end

  add_foreign_key "channel_users", "channels"
  add_foreign_key "channel_users", "users"
  add_foreign_key "messages", "channel_users"
  add_foreign_key "reactions", "emojis"
  add_foreign_key "reactions", "messages"
end
