class UsersController < ApplicationController
  def index
    @users = User.includes(:reviews).includes(:owned_games).includes(:image)
             .includes(:rank).all.order(review_count: :desc)[0..9]
    render :index
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @user.rank_id = Rank.first.id
    if @user.save
      login(@user)
      redirect_to :root
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def update
    @user = User.includes(:reviews).find(params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @user = User.includes(:reviews).find(params[:id])
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:password, :username, :email, :commentable_id,
                                 :commentable_type, :rank_id, :review_count)
  end
end
