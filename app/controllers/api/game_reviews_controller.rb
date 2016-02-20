class Api::GameReviewsController < ApplicationController
  def index
    @game_reviews = Game.find(params[:game_id]).reviews
                        .where(commentable_type: 'Game').order('created_at')
                        .reverse_order.page(params[:page]).per(5)
    render json: {
      models: @game_reviews,
      page: params[:page],
      total_pages: @game_reviews.total_pages
    }
  end

  def update
    @game_review = Review.find(params[:id])
    if @game_review.update(review_params)
      render json: @game_review
    else
      render json: @game_review.errors.full_messages,
                   status: :unprocessable_entity
    end
  end

  private

  def review_params
    params.require(:review).permit(:body, :score, :commentable_id,
                                   :commentable_type)
  end
end
