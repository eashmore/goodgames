class GameReviewsController < ApplicationController
  def index
    @reviews = Game.find(params[:game_id]).reviews.order('created_at').reverse_order.page(params[:page]).per(10)
    render json: {
        :models => @reviews,
        :page => params[:page],
        :total_pages => @reviews.total_pages # thanks kaminari!
    }
  end
end
