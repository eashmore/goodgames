class AddNamesToCollection < ActiveRecord::Migration
  def change
    add_column :collections, :user_name, :string
    add_column :collections, :game_name, :string
  end
end
