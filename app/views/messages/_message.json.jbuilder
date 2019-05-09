json.extract! message, :id, :channel_user_id, :text, :ts, :created_at, :updated_at
json.url message_url(message, format: :json)
