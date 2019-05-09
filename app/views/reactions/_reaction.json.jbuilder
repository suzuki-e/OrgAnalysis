json.extract! reaction, :id, :emoji_id, :message_id, :count, :created_at, :updated_at
json.url reaction_url(reaction, format: :json)
