json.partial! 'users/user', user: @user

json.wishlist_games @user.wishlist_games do |game|
  json.partial! 'games/game', game: game
end

json.comments @user.comments do |comment|
  json.partial! 'reviews/review', review: comment
end
