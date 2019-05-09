Rails.application.routes.draw do
  resources :reactions
  resources :emojis
  resources :messages
  resources :channels
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
