class GameReviewsController < ApplicationController
  def index
    @reviews = Game.find(params[:game_id]).reviews.where({ commentable_type: 'Game' }).order('created_at').reverse_order.page(params[:page]).per(10)
    render json: {
        :models => @reviews,
        :page => params[:page],
        :total_pages => @reviews.total_pages
    }
  end

  def update
    @review = Review.find(params[:id])
    if @review.update(review_params)
      render json: @review
    else
      render json: @review.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def review_params
    params.require(:review).permit(:body, :score, :commentable_id, :commentable_type);
  end
end
