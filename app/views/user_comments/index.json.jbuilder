json.array! @comments do |comment|
  json.partial! 'reviews/review', review: comment 
end
