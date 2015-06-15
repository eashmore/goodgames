json.extract! user, :username, :id, :about

json.reviews user.reviews do |review|
  json.partial! 'reviews/review', review: review
end
