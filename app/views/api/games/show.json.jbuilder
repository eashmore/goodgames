json.partial! 'api/games/game', game: @game

json.reviews @game.reviews do |review|
  json.partial! 'api/reviews/review', review: review
end
