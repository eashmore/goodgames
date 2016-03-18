class Api::UserCommentsController < ApplicationController
  def index
    @comments = User.find(params[:user_id]).comments
                .where(commentable_type: 'User').order('created_at')
                .reverse_order.page(params[:page]).per(5)
    render json: {
      models: @comments,
      page: params[:page],
      total_pages: @comments.total_pages
    }
  end
end
