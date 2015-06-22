json.array! @recommendations do |recommendation|
  json.partial! 'collections/collection', collection: recommendation
end
