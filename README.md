# Goodgames

![alt text][screenshot]

[Live link][link]

[screenshot]: ./docs/goodgames.png
[link]: http://thegoodgames.xyz

Goodgames is a site for finding, recommending and reviewing video games. Users can add and remove games from a Recommended list that is publicly viewable by all other users. The application's game database consumes information from the Giantbomb API.

Features:

* Game database populated through the overriding of Backbone.js’s Model#parse method to parse nested data from the Giantbomb API* Search feature cache video game data and images consumed from the Giantbomb API to
* Reviews and Comments share a Reviews table via polymorphic associations to maintain anormalized database* Custom authentication using BCrypt which stores user’s password as a secret hash

Technologies used to build this application include:

* Rails
* Backbone.js
* jQuery
* Bootstrap

## Minimum Viable Product
Goodgames is application inspired by Goodreads built on Rails and Backbone in which users are able to:

- [X] Create accounts
- [X] Create sessions (log in)
- [X] Review and score video games
- [X] View average user score for video games
- [X] Search for games by title
- [X] Recommend a video game
- [X] Maintain a video game wishlist

## Design Docs
* [View Wireframes][views]
* [Proposed DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md
