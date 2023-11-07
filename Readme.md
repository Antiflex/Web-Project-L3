# Web Project : EZ Games
Project made by : Me :)
Note that some ```console.log``` may be remaining from development
## Main features :
* A few simple games : [*tic-tac-toe*](https://en.wikipedia.org/wiki/Tic-tac-toe) and [*whack-a-mole*](https://en.wikipedia.org/wiki/Whac-A-Mole)
* A signup-login-logout system
* Each player's game sessions are saved

## Other features :
* A leaderboard for each game 

## Not implemented yet :
* A friendship system (only exists in the database)
* A way to update your account infos, change your password and delete your account

## Run the project :
* Download npm
* Prepare a folder and install Node.js there using npm
* Run ```npm install``` to install all the dependencies listed in ``package.json``

### create the database :
* Create the database in pgadmin or in psql command line and name it ``EZ_games``
* Add a user to the database called ``admin_games`` with the sql command :
```SQL
CREATE ROLE admin_games WITH LOGIN SUPERUSER PASSWORD 'password';
```
Or change the user in /database/knexfile.cjs to whichever already existing postgres user you want
* Run the following npm scripts in the project root directory:   
```npm run migrate``` creates all the tables and their constraints  
```npm run seed_fake``` if you want to seed the fake data for tests  
```npm run seed_prod``` if you want to seed the production data (only features a single user)  
```npm run start```
> ⚠ note that running a seed script will override the effects of the precedent

* The site runs on localhost port 3000 so open your browser and browse
[*localhost:3000*](http://localhost:3000)
