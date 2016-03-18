class Api::WishlistsController < ApplicationController
  def index
    @wishlists = Wishlist.all
    render json: @wishlists
  end

  def create
    @wishlist = Wishlist.new(wishlist_params)
    if @wishlist.save
      render json: @wishlist
    else
      render json: @wishlist.errors.full_messages,
                   status: :unprocessable_entity
    end
  end

  def destroy
    @wishlist = Wishlist.find(params[:id])
    @wishlist.destroy
    render json: []
  end

  private

  def wishlist_params
    params.require(:wishlist).permit(:user_id, :game_id)
  end
end
