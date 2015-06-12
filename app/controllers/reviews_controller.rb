class ReviewsController < ApplicationController
  def index
    @reviews = Review.all
    render json: @reviews
  end

  def new
  end

  def create
    @review = current_user.reviews.new(review_params);
    if @review.save
      render json: @review
    else
      render json: @review.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @review = Review.find(params[:id]);
    render :show
  end

  def edit
  end

  def destroy
  end

  private

  def review_params
    params.require(:review).permit(:body, :score, :game_id);
  end
end
