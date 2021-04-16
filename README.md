# TechQuiz

## Link to component-ui diagram
https://drive.google.com/file/d/1oDLA9d-csA1nvQ5PhDyj0CNwDRdSLUy8/view?usp=sharing

*Project under construction.*

***Description***

TechQuiz is an online quiz game that allows people to compete against each other on
technological questions. Every game consists of sets of quizzes where each player receives ten
points per correct answered question. When all sets are played the player with the highest score
wins. If the scores are equal the game is ended as a draw.
TechQuiz also allows players to compete against themselves and test their knowledge in
technological topics. Depending on how quick they answer, they receive higher scores that allow
them to climb in the leaderboard.

***What we've done so far***

Features:
* Signing up new accounts
* Logging into and out of accounts
* Profile page
* A matchmaking system  
* Finding games against random opponents
* Generating random categories for the gamesets
* Fetching questions from the quizAPI with said categories
* Starting, playing and finishing multiplayer games



***What we still plan to do***

Features:
* Creating games against a certain username
* Single player games
* Implement a timer for the games
* Changing usernames/passwords/emails
* Leaderboards pages for each category as to show all entries rather than top 10
* Showing Game History
* Showing Current Games
* Viewing other players profiles
* Quick-rematching against previously played users.
* Friends list of other users  
* General fixes
* General CSS changes

***The project file structure***

All code for this project is stored in the src/ folder. 
Therein lies the app itself, the index.js file, the css 
and several important folders: components, containers and store. 

* The components folder contains all our different vues and are structured 

* The containers folder contains all our presenters to the according vues. 

* The store folder contains all our actions and reducers. 
