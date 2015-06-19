json.extract! user, :username, :id, :about

json.reviews user.reviews do |review|
  json.partial! 'reviews/review', review: review
end

json.owned_games user.owned_games do |game|
  json.partial! 'games/game', game: game
end

if user.image
  json.image do
    json.partial! 'images/image', image: user.image
  end
end

if user.rank
  json.rank do
    json.partial! 'ranks/rank', rank: user.rank
  end
end
