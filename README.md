# Goodgames

[Heroku link][heroku]

[heroku]: http://goodgames-app.herokuapp.com

## Minimum Viable Product
Goodgames is a Goodreads clone built on Rails and Backbone in which users will be able to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [X] Create accounts
- [X] Create sessions (log in)
- [X] Review and score video games
- [X] View average user score of video games
- [X] Search for games by title
- [ ] Maintain a video game wishlist

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication (~0.5 day)
I will implement user authentication in Rails based on the practices learned at App Academy. By the 
end of this phase, users will be able to create an account and log in.

[Details][phase-one]

### Phase 2: Viewing Games (~1 day)
I will add API routes to serve game data as JSON, then add Backbone models and collections that fetch 
data from those routes. By the end of this phase, users will be able to view an index of games, as 
well as single games with more detailed information, all inside a single Backbone app.

[Details][phase-two]

### Phase 3: Displaying Reviews (~1 day)
I will add API routes to serve blog and post data as JSON, then add Backbone models and collections 
that fetch data from those routes. By the end of this phase, users will be able to view a review.

[Details][phase-three]

### Phase 4: Editing and Displaying Reviews (~2 days)
I will add a ReviewForm so that users can write reviews and issue scores for a game. I'll need to add 
a Markdown editor to the `ReviewForm`, and make sure that the Markdown is properly escaped and 
formatted in the `ReviewShow` view.

[Details][phase-four]

### Phase 5: Searching for Games (~2 days)
I'll need to add `search` routes to both the Games controller. On the Backbone side, there will be a 
`SearchResults` composite view with 'GamesIndex' subviews. These views will use 'games'collections, 
but they will fetch from the new `search` routes.

[Details][phase-five]

### Phase 6: User View (~2 day)
I will add Backbone models and collections as well as Views so that a user can view their own profile 
as well as the profile of other users.

[Details][phase-six]

### Phase 7: Wishlist (~2 days)
I will add a wishlist model and colleciton that that can display a list of games.


[Details][phase-seven]

### Bonus Features (TBD)
- [ ] User avatars
- [ ] Comments on user and game show views
- [ ] Recent activity feed
- [ ] "Like" button for reviews
- [ ] Pagination/infinite scroll
- [ ] Typeahead search bar
- [ ] Multiple sessions/session management

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md


