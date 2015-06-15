class AddPolymorphicToReviews < ActiveRecord::Migration
  def change
    add_column :reviews, :commentable_id, :integer
    add_column :reviews, :commentable_type, :string

    add_index :reviews, :commentable_id
  end
end
