# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Rank.create({
  name: 'Goomba',
  score: 0,
  image_url: 'http://res.cloudinary.com/dqucbuno8/image/upload/c_scale,w_250/v1434752158/180px-Goomba_onloq5.png'
})

Rank.create({
  name: 'Noob',
  score: 1,
  image_url: 'http://res.cloudinary.com/dqucbuno8/image/upload/c_scale,w_250/v1434663945/400px-MushroomMarioKart8_graijs.png'
})
Rank.create({
  name: 'Casual',
  score: 10,
  image_url: 'http://res.cloudinary.com/dqucbuno8/image/upload/c_scale,w_250/v1434732464/1upshroom_etlixx.png'
})
Rank.create({
  name: 'Hardcore',
  score: 25,
  image_url: 'http://res.cloudinary.com/dqucbuno8/image/upload/c_scale,w_250/v1434732406/bronze_mushroom_by_machrider14-d56hgo9_i1qeh1.png'
})
Rank.create({
  name: 'Pro Gamer',
  score: 50,
  image_url: 'http://res.cloudinary.com/dqucbuno8/image/upload/c_scale,w_250/v1434663949/silver_mushroom_by_machrider14-d56hg9t_jboxek.png'
})
Rank.create({
  name: 'Master',
  score: 75,
  image_url: 'http://res.cloudinary.com/dqucbuno8/image/upload/c_scale,w_250/v1434663941/400px-GoldenMushroomMK8_wvy0ml.png'
})
Rank.create({
  name: 'Gaming God',
  score: 100,
  image_url: 'http://res.cloudinary.com/dqucbuno8/image/upload/v1434750624/Retro_Mushroom_Super_3_fefmzh.png'
})
