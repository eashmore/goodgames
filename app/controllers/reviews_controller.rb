class ReviewsController < ApplicationController
  def index
    @reviews = Review.all
    render json: @reviews
  end

  def new
  end

  def create
    @review = current_user.reviews.new(review_params)
    @review.author = current_user.username
    if @review.save
      render json: @review
    else
      render json: @review.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @review = Review.find(params[:id])
    render :show
  end

  def update
    @review = Review.find(params[:id])
    if @review.update(review_params)
      render json: @review
    else
      render json: @review.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
  end

  private

  def review_params
    params.require(:review).permit(:body, :score, :commentable_id, :commentable_type);
  end
end
