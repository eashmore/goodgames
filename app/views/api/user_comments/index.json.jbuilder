json.array! @comments do |comment|
  json.partial! 'api/reviews/review', review: comment
end
