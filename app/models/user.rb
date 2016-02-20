class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  after_initialize :ensure_session_token

  belongs_to :rank

  has_one :image
  has_many :collections
  has_many :wishlists
  has_many :reviews
  has_many :owned_games, through: :collections, source: :game
  has_many :wishlist_games, through: :wishlists, source: :game
  has_many :comments, as: :commentable, class_name: 'Review'

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.valid_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def self.update_count
    all.each do |user|
      user.review_count = user.reviews.where(commentable_type: 'Game').length
      user.save
    end
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end
