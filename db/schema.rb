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

ActiveRecord::Schema.define(version: 2019_05_27_072030) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channel_users", force: :cascade do |t|
    t.bigint "channel_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "joined", default: false, null: false
    t.integer "messages_count", default: 0, null: false
    t.index ["channel_id"], name: "index_channel_users_on_channel_id"
    t.index ["user_id"], name: "index_channel_users_on_user_id"
  end

  create_table "channels", force: :cascade do |t|
    t.string "slack_id", null: false
    t.string "name", null: false
    t.bigint "created", null: false
    t.boolean "is_archived", default: false, null: false
    t.string "name_normalized", null: false
    t.boolean "is_private", default: false, null: false
    t.string "topic", null: false
    t.string "purpose", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "messages_count", default: 0, null: false
    t.integer "users_count", default: 0, null: false
    t.index ["id"], name: "index_channels_on_id", unique: true
  end

  create_table "emojis", force: :cascade do |t|
    t.string "slack_name", null: false
    t.string "url", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "used_count", default: 0, null: false
    t.index ["id"], name: "index_emojis_on_id", unique: true
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "channel_user_id"
    t.text "text", null: false
    t.string "ts", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "timestamp", null: false
    t.index ["channel_user_id"], name: "index_messages_on_channel_user_id"
  end

  create_table "reactions", force: :cascade do |t|
    t.bigint "emoji_id"
    t.bigint "message_id"
    t.integer "count", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["emoji_id"], name: "index_reactions_on_emoji_id"
    t.index ["message_id"], name: "index_reactions_on_message_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "slack_id", null: false
    t.string "name", null: false
    t.boolean "deleted", default: false, null: false
    t.string "real_name", null: false
    t.string "email", null: false
    t.string "profile_image", null: false
    t.boolean "is_bot", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "messages_count", default: 0, null: false
    t.index ["id"], name: "index_users_on_id", unique: true
  end

  add_foreign_key "channel_users", "channels"
  add_foreign_key "channel_users", "users"
  add_foreign_key "messages", "channel_users"
  add_foreign_key "reactions", "emojis"
  add_foreign_key "reactions", "messages"
end
