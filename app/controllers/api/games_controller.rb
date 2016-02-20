class Api::GamesController < ApplicationController
  def index
    @games = Game.includes(:reviews).all
    render :index
  end

  def create
    @game = Game.new(game_params)
    Cloudinary::Uploader.upload(@game.boxart_url, public_id: @game.id)
    @game.boxart_url =
      "http://res.cloudinary.com/dqucbuno8/image/upload/#{@game.id}.jpg"
    @game.thumbnail_url =
      "http://res.cloudinary.com/dqucbuno8/image/upload/c_scale,h_250/#{@game.id}.jpg"
    @game.score = 0.0
    if @game.save
      render json: @game
    else
      render json: @game.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @game = Game.find(params[:id])
    render :show
  end

  def update
    @game = Game.find(params[:id])
    if @game.update(game_params)
      render json: @game
    else
      render json: @game.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def game_params
    params.require(:game).permit(:name, :deck, :id, :boxart_url,
                                 :release_date, :platforms)
  end
end
