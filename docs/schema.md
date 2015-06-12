# Schema Information

## games
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null, unique
image_url   | string    | 
score       | integer   | 


## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text      | not null
score       | integer   | not null
user_id     | integer   | not null, foreign key (references user)
game_id     | integer   | not null, foreign key (references game)


## wishlists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
game_id     | integer   | not null, foreign key (references games)


## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

