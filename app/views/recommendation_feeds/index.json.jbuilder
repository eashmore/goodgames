json.array! @recommendations do |recommendation|
  json.partial! 'recommendation_feeds/recommendation_feed', feed: recommendation

  if recommendation.image
    json.image do
      json.partial! 'images/image', image: recommendation.image
    end
  end

end
