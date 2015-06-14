class AddPlatformAndReleaseDateToGames < ActiveRecord::Migration
  def change
    add_column :games, :release_date, :string
    add_column :games, :platforms, :text
  end
end
