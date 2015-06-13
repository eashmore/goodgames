json.array! @wishlists do |wishlist|
  json.extract! wishlist, :user_id, :game_id
end
