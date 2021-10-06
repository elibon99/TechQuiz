# TechQuiz

### Setting up the application
To run the application you will need to have Node installed on your machine.

To clone the app to your local machine, use the following command:
```
git clone git@gits-15.sys.kth.se:bonnici/Project.git
```

When repo is clowned run the following app to set up the right dependecies:
```
npm install
```

To run the application, execute the following command:
```
npm start
```

Note: Make sure you are in the techquiz folder before executing the above comands!

### Link to app: 
https://techquiz-de162.web.app/


### Link to component-ui diagram
https://drive.google.com/file/d/1oDLA9d-csA1nvQ5PhDyj0CNwDRdSLUy8/view?usp=sharing


### Description

TechQuiz is an online quiz game that allows people to compete against each other on
technological questions. Every game consists of sets of quizzes where each player receives (twenty - amount of seconds elapsed)
points per correct answered question. If the time reaches zero or the player answers incorrectly, they recieve 0 points. When all sets are played the player with the highest score
wins. If the scores are equal the game is ended as a draw.
