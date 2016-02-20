class Api::RanksController < ApplicationController
  def index
    @ranks = Rank.all
    render json: @ranks
  end

  def create
    @rank = new Rank(rank_params)
    if @rank.save
      render json: @rank
    end
  end

  def show
    @rank = Rank.find(params[:id])
    render json: @rank
  end

  private

  def rank_params
    params.require(:rank).permit(:score, :name, :image_url)
  end
end
