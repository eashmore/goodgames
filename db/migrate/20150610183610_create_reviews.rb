class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.text :body, null: false
      t.integer :score, null: false
      t.integer :user_id, null: false
      t.integer :game_id, null: false

      t.timestamps null: false
    end
    add_index(:reviews, :game_id)
    add_index(:reviews, :user_id)

  end
end
