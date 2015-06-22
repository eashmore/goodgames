class RecommendationFeedsController < ApplicationController
  def index
    @recommendations = Collection.all.reverse_order.limit(20)
    render :index
  end
end
