class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :game

  validates :body, :score, presence: true
  validates :score, numericality: { greater_than: 0 }

end
