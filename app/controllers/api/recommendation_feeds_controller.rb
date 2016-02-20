class Api::RecommendationFeedsController < ApplicationController
  def index
    @recommendations = Collection.all.order(created_at: :desc).limit(20)
    render :index
  end
end
