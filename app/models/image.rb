class Image < ActiveRecord::Base
  validates :url, :user, presence: true

  belongs_to :user
end
