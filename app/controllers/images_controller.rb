class ImagesController < ApplicationController
  # def index
  #   render json: Image.all.to_json
  # end

  def create
    @image = Image.new(image_params)
    @image.user_id = current_user.id
    if @image.save
      render json: @image
    else
      render json: @image.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
    @images = Image.all
    render json: @images
  end

  def show
    render json: Image.find(params[:id])
  end

  def update
    @image = Image.find(params[:id])
    if @image.update(image_params)
      render json: @image
    else
      render json: @image.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def image_params
    params.require(:image).permit(:url, :thumb_url)
  end
end
