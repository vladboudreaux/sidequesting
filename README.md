# Sidequesting

This initially started as a sidequest during the Docker modules, but I've decided to run with it as the deliverable for Project 3.

## Description
Essentially what we've got here is a database for a Role Playing Style game. The front end enables users to see results for all of the Users, Characters, Classes, Equipment, Abilities, and Enemies in the game.

All of the data was created using Faker.js, which leads to some pretty hilarious items and item descriptions.

## Current Status
The backend currently works for querying all of the different databases. The Characters page is the only one that does a join with the 'Users' and 'Classes' table so that it renders the class and user names appropriately. I also created a sweet little run script to reset the database, since seeding and reseeding tends to throw some errors.

Simply run `` npm run db-reset ``. It will run the following commands in sequence:
``npx knex migrate:rollback --all``,
``npx knex migrate:latest``,
``npx knex seed:run``.
Faker will do all the leg work for you.

## Next Steps:
[ ] Create a login feature. Ideally, only the Administrator should be able to see everybody else's information. I'd like the user to only be able to see the Characters and User Info for themselves.

[ ] I think I'll create a conditionally rendered page for the Admin, so that they can access a terminal window to the Postgres DB using xterm.js. I'll have to do a lot of reading for this one, but it seems feasible based on some googling.

[ ] Get better at styling. I'm ready to start on this, but it needs a bit of love.

[ ] Unit test? Yeah, idk.

[ ] Installation instructions.