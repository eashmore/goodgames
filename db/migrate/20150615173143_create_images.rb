class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :url, null: false
      t.string :thumb_url
      t.integer :user_id, null: false

      t.timestamps null: false
    end
    add_index(:images, :user_id, unique: true)
  end
end
