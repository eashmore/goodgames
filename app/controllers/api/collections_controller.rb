class Api::CollectionsController < ApplicationController
  def create
    @collection = Collection.new(collection_params)
    if @collection.save
      render json: @collection
    else
      render json: @collection.errors.full_messages,
                   status: :unprocessable_entity
    end
  end

  def destroy
    @collection = Collection.find(params[:id])
    @collection.destroy
    render json: []
  end

  private

  def collection_params
    params.require(:collection).permit(:user_id, :game_id,
                                       :game_name, :user_name)
  end
end
