class CollectionsController < ApplicationController

  def create
    @collection = Collection.new(collection_params)
    if @collection.save
      render json: @collection
    else
      render json: @collection.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def collection_params
    params.require(:collection).permit(:user_id, :game_id)
  end
end
