class Game < ActiveRecord::Base
  validates :name, presence: true

  has_many :reviews, as: :commentable

  def self.update_scores
    self.all.each do |game|
      average_score = nil
      total = 0.0
      game.reviews.each do |review|
        total += review.score
      end
      if total == 0.0
        average_score = 0.0
      else
        average_score = ((total / game.reviews.length.to_f) * 100.0).round / 100.0
      end
      game.update(score: average_score)
    end
  end
end
