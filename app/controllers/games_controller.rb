class GamesController < ApplicationController

  def index
    @games = Game.all
    render json: @games
  end

  def create
    @game = Game.new(game_params)
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
    params.require(:game).permit(:name, :deck, :id, :boxart_url, :release_date, :platforms)
  end
end
