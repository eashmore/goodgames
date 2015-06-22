class Collection < ActiveRecord::Base
  validates :game, :user, :user_name, :game_name, presence: true

  belongs_to :game
  belongs_to :user

  has_one :image, through: :user, source: :image
end
