json.extract! user, :id, :name, :deleted, :real_name, :email, :profile_image, :is_bot, :created_at, :updated_at
json.url user_url(user, format: :json)
