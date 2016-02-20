json.partial! 'users/user', user: @user

json.wishlist_games @user.wishlist_games do |game|
  json.partial! 'api/games/game', game: game
end

json.comments @user.comments do |comment|
  json.partial! 'api/reviews/review', review: comment
end

json.reviews @user.reviews do |review|
  json.partial! 'api/reviews/review', review: review
end
