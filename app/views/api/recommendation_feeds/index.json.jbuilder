json.array! @recommendations do |recommendation|
  json.partial! 'api/recommendation_feeds/recommendation_feed', feed: recommendation

  if recommendation.image
    json.image do
      json.partial! 'api/images/image', image: recommendation.image
    end
  end

end
