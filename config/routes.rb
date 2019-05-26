Rails.application.routes.draw do
  resources :reactions
  resources :emojis
  resources :messages
  resources :channels do
    get 'message_groupdate', to: 'message_groupdates#index'
    get 'channel_emoji', to: 'channel_emojis#index'
  end
  get 'message_groupdate', to: 'message_groupdates#index'
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
