class CreateWishlists < ActiveRecord::Migration
  def change
    create_table :wishlists do |t|
      t.integer :user_id, null: false
      t.integer :game_id, null: false

      t.timestamps null: false
    end
    add_index(:wishlists, :game_id)
    add_index(:wishlists, :user_id)
  end
end
