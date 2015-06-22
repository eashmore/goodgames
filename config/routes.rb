Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create, :index, :show, :update]
  resource :session, only: [:new, :create, :destroy]

  resources :games
  resources :reviews

  resources :collections
  resources :wishlists
  resources :images
  resources :ranks

  resources :game_reviews
  resources :user_comments
  resources :recommendation_feeds
end
