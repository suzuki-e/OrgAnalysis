json.extract! channel, :id, :name, :created, :is_archived, :name_normalized, :is_private, :topic, :purpose, :created_at, :updated_at
json.url channel_url(channel, format: :json)
