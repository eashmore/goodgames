class Collection < ActiveRecord::Base
  validates :game, :user, :user_name, :game_name, presence: true # TA: I did this

  belongs_to :game
  belongs_to :user
end
