class CreateCollections < ActiveRecord::Migration
  def change
    create_table :collections do |t|
      t.integer :game_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
    add_index(:collections, :game_id)
    add_index(:collections, :user_id)
  end
end
