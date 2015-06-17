class UsersController < ApplicationController
  def index
    @users = User.includes(:reviews).all
    render :index
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)

      redirect_to :root
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.includes(:reviews).find(params[:id])
    render :show
  end

  private
  def user_params
    params.require(:user).permit(:password, :username, :email, :commentable_id, :commentable_type)
  end
end
