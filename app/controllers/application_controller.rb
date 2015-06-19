require "nokogiri"
require "open-uri"

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?, :fill_game_database, :createRanks

  # skip_before_filter :verify_authenticity_token

  # before_filter :set_access

  # def set_access
  #   headers["Access-Control-Allow-Origin"] = "*"
  #   headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE, OPTIONS'
  #   headers['Access-Control-Allow-Credentials'] = 'true'
  #   headers['Access-Control-Allow-Headers'] = 'X-Requested-With,Content-Type'
  # end

  def createRanks #move to seeds

    Rank.create({
      name: 'Newbie',
      score: 0,
      image_url: 'http://res.cloudinary.com/dqucbuno8/image/upload/c_scale,w_250/v1434732557/20101027034119_PoisonMushroom_bmbrcw.png'
    })
    Rank.create({
      name: 'Casual Gamer',
      score: 10,
      image_url: 'http://res.cloudinary.com/dqucbuno8/image/upload/c_scale,w_250/v1434663945/400px-MushroomMarioKart8_graijs.png'
    })
    Rank.create({
      name: 'Hardcore Gamer',
      score: 25,
      image_url: 'http://res.cloudinary.com/dqucbuno8/image/upload/c_scale,w_250/v1434732464/1upshroom_etlixx.png'
    })
    Rank.create({
      name: 'Pro Gamer',
      score: 50,
      image_url: 'http://res.cloudinary.com/dqucbuno8/image/upload/c_scale,w_250/v1434732406/bronze_mushroom_by_machrider14-d56hgo9_i1qeh1.png'
    })
    Rank.create({
      name: 'Master Gamer',
      score: 100,
      image_url: 'http://res.cloudinary.com/dqucbuno8/image/upload/c_scale,w_250/v1434663949/silver_mushroom_by_machrider14-d56hg9t_jboxek.png'
    })
    Rank.create({
      name: 'God of Gaming',
      score: 250,
      image_url: 'http://res.cloudinary.com/dqucbuno8/image/upload/c_scale,w_250/v1434663941/400px-GoldenMushroomMK8_wvy0ml.png'
    })
  end

  def fill_game_database # TA: seeds or rake task  seed_dump
    # Game.all.delete_all
    id_list = [
      #popular
      36765, 36113, 46569, 35573, 24024,
      #new releases
      41484, 45577, 46582, 47342, 49073,
      #highest rated,
      26839, 22420, 1539, 15473, 2600,
      #classics
      12572, 10299, 18115, 9463, 8307,
      ]

    # offset = 0;
    # while offset < 1
      # file_handle = open("http://www.giantbomb.com/api/games/?api_key=" + ENV['giantbomb_api_key'] + "&offset=" + offset.to_s)
      #
      # file_handle = open("http://www.giantbomb.com/api/games/?api_key=" + ENV['giantbomb_api_key'] + "&sort=number_of_user_reviews&limit=50")
      # doc = Nokogiri::XML(file_handle)
      #
      # # doc.css('game').each do |node|
      # doc.css('game').each do |node|
      #   id_list << node.css('id').first.inner_text
      # end
      # offset += 100
    # end

    id_list.each do |id|
      file_handle = open("http://www.giantbomb.com/api/game/3030-" + id.to_s + "/?api_key=" + ENV['giantbomb_api_key'])
      doc = Nokogiri::XML(file_handle)
      doc.css('results').each do |node|
        platforms = ""
        node.css('platform').each do |platform|
          platforms += platform.css('name').inner_text + "@@@"
        end
        Game.create({
          name: node.css('name').first.inner_text,
          deck: node.css('deck').first.inner_text,
          id: node.css('id').first.inner_text,
          boxart_url: node.css('small_url').first ? node.css('small_url').first.inner_text() : "",
          release_date: node.css('original_release_date').first.inner_text[0..9],
          platforms: platforms
        })
      end
    end
  end

  private
  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def signed_in?
    !!current_user
  end

  def login(user)
    @current_user = user
    session[:session_token] = user.reset_token!
  end

  def logout
    current_user.try(:reset_token!)
    session[:session_token] = nil
  end

  def require_signed_in!
    redirect_to new_session_url unless signed_in?
  end
end
