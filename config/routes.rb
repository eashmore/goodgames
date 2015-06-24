Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create, :index, :show, :update]
  resource :session, only: [:new, :create, :destroy]

  resources :games, only: [:create, :index, :show, :update]
  resources :reviews, only: [:create, :index, :show, :update]

  resources :collections, only: [:index, :create, :destroy]
  resources :wishlists, only: [:index, :create, :destroy]
  resources :images, only: [:create, :index, :show, :update]
  resources :ranks, only: [:create, :index, :show]

  resources :game_reviews, only: [:index, :update]
  resources :user_comments, only: :index
  resources :recommendation_feeds, only: :index

end
