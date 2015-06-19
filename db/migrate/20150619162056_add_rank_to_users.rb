class AddRankToUsers < ActiveRecord::Migration
  def change
    add_column :users, :rank_id, :integer
    add_index :users, :rank_id
  end
end
