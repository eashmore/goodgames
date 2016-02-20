json.extract! user, :username, :id, :about, :review_count

json.owned_games user.owned_games do |game|
  json.partial! 'api/games/game', game: game
end

if user.image
  json.image do
    json.partial! 'api/images/image', image: user.image
  end
end

if user.rank
  json.rank do
    json.partial! 'api/ranks/rank', rank: user.rank
  end
end
