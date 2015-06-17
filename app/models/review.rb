class Review < ActiveRecord::Base
  belongs_to :user
  belongs_to :commentable, polymorphic: true

  validates :body, :score, :user, presence: true
  validates :score, numericality: { greater_than: 0, less_than: 6 }

end
