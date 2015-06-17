json.array! @collections do |collection|
  json.partial! 'collections/collection', collection: collection
end
