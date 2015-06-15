json.partial! 'users/user', user: @user

json.reviews @user.reviews do |review|
  json.partial! 'reviews/review', review: review
end

json.owned_games @user.owned_games do |game|
  json.partial! 'games/game', game: game
end

json.wishlist_games @user.wishlist_games do |game|
  json.partial! 'games/game', game: game
end

json.comments @user.comments do |comment|
  json.partial! 'reviews/review', review: comment
end
