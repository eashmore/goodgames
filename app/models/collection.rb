class Collection < ActiveRecord::Base
  validates :game, :user, presence: true # TA: I did this

  belongs_to :game
  belongs_to :user
end
