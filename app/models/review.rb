class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :game

  validates :body, :score, presence: true # TA user, game
  validates :score, numericality: { greater_than: 0, less_than: 6 }

end
