json.array! @collections do |collection|
  json.extract! collection, :user_id, :game_id
end
