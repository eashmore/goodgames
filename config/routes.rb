Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create, :index]
  resource :session, only: [:new, :create, :destroy]

  resources :games
  resources :reviews
end
