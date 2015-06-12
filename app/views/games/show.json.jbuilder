json.extract! @game, :score, :id, :name, :deck, :thumbnail_url, :boxart_url

json.reviews @game.reviews do |review|
  json.partial! 'reviews/review', review: review
end
