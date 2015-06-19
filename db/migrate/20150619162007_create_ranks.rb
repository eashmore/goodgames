class CreateRanks < ActiveRecord::Migration
  def change
    create_table :ranks do |t|
      t.string :name, null: false
      t.string :image_url, null: false
      t.integer :score, null: false

      t.timestamps null: false
    end
  end
end
