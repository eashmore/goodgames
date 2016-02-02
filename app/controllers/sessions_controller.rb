class SessionsController < ApplicationController
  def new
    if current_user
      logout
      redirect_to new_session_url
    end
  end

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if user
      login(user)
      redirect_to :root
    else
      flash.now[:errors] = ['Invalid username or password']
      render :new
    end
  end

  def destroy
    logout
    redirect_to new_session_url
  end
end
