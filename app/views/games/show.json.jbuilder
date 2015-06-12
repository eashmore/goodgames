json.partial! 'games/game', game: @game

json.reviews @game.reviews do |review|
  json.partial! 'reviews/review', review: review
end
