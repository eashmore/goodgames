class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name
      t.string :deck, null: false
      t.float :score
      t.string :thumbnail_url
      t.string :boxart_url

      t.timestamps null: false
    end
    add_index(:games, :name)
  end
end
