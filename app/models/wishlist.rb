class Wishlist < ActiveRecord::Base
  validates :game, :user, presence: true

  belongs_to :game
  belongs_to :user
end
