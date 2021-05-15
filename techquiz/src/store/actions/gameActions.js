
/* All categories in the API. Used for selecting 4 random categories for the question retrieval.
* All images (iconSrc) taken from iconify. */

const categories = [
    {category: "Linux", value: "Linux", tags: "Linux", iconSrc: "https://api.iconify.design/fa-brands:linux.svg"},
    {category: "DevOps", value: "DevOps", tags: "DevOps", iconSrc: "https://api.iconify.design/cib:azure-devops.svg"},
    {category: "MySQL", value: "SQL", tags: "MySQL", iconSrc: "https://api.iconify.design/cib:mysql.svg"},
    {category: "PHP", value: "Code", tags:"PHP", iconSrc: "https://api.iconify.design/fa-brands:php.svg"},
    {category: "BASH", value: "bash", tags: "BASH", iconSrc: "https://api.iconify.design/bi:terminal.svg"},
    {category: "Docker", value: "Docker", tags: "Docker", iconSrc: "https://api.iconify.design/file-icons:docker.svg"},
    {category: "HTML", value: "Code", tags: "HTML", iconSrc: "https://api.iconify.design/dashicons:html.svg"},
    {category: "WordPress", value: "CMS", tags: "WordPress", iconSrc: "https://api.iconify.design/bx:bxl-wordpress.svg"},
    {category: "Laravel", value: "Code", tags: "Laravel", iconSrc: "https://api.iconify.design/cib:laravel.svg"},
    {category: "Kubernetes", value: "", tags: "Kubernetes", iconSrc: "https://api.iconify.design/logos:kubernetes.svg"},
    {category: "JavaScript", value: "Code", tags: "JavaScript", iconSrc: "https://api.iconify.design/bx:bxl-javascript.svg"}
]

/**
 * This function gets 4 categories using the getCategories method.
 * @returns - dispatch of type success or failure depending on createFriendGame state.
 * @returns - selectedCats - the 4 selected categories.
 * */
export const generateCategories = (gameID) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        let selectedCats = getCategories();

        const firestore = getFirestore();
        firestore.collection('games').doc(gameID).update({
            generatedCategories: selectedCats
        }).then(() => console.log("Updated generated categories"))
            .catch((error) => console.log("Failed to update generated categories"));

        //dispatch({type: 'GENERATE_CATEGORIES_SUCCESS', payload: selectedCats});
    }
}

/**
 * This function generates 4 random categories out of the 11 declared above.
 * @returns - selectedCategories - the 4 selected categories.
 * */
function getCategories(){
    let selectedCategories = [];
    var cats = [...categories];
    for(let i = 0; i < 4; i += 1){
        var randomIndex = Math.floor(Math.random() * (cats.length-1));
        selectedCategories.push(cats[randomIndex]);
        cats.splice(randomIndex, 1);
    }
    return selectedCategories;
}

/* The URL to the API */
const URL = "https://quizapi.io/api/v1/questions?";

/* Our API key... should not be here */
const API_KEY  = "UwbOCHKVnP7pMftLcMxEB2vvycdJtFg7rOAWaEKR";

/**
 * This function fetches 3 random questions from the chosen category and adds them to the
 * game in the database.
 * @param gamingID - the id of the game.
 * @param category - the selected category.
 * @returns - dispatch of type success or failure depending on fetchQuestions state.
 * */
export const fetchQuestions = (gamingID, category) => {
    return(dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();

        const params = {tags: category, limit: "3"};

        /* Fetch from the api */
        fetch(URL + new URLSearchParams(params), {
            "method": "GET",
            "headers": {
                "X-API-KEY": API_KEY,
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            }
            /* update the database and game with the fetched questions. */
        }).then(resp => resp.json())
            .then((resp) => {
                firestore.collection('games').doc(gamingID).collection('gameSets').get()
                    .then((querySnapshot) => {
                        var gameSetID = querySnapshot.size + 1;
                        gameSetID = JSON.stringify(gameSetID)
                        firestore.collection('games').doc(gamingID).collection('gameSets').doc(gameSetID).set({
                            questions: {resp},
                            score: 0,
                            category: category,
                            activeQuestion: 0,
                            hasBeenAnsweredBy: 0,
                            createdAt: new Date()
                        })
                            .then((doc) => {
                                firestore.collection('games').doc(gamingID).update({
                                    currentSet: gameSetID,
                                    hasChosenCategory: true
                                })
                                    .then()
                                    .catch((err) => console.log(err, 'something went wrong inside currentset add'));
                            })
                            .catch((error) => console.log("Error updating games: ", error));

                    }).catch((error) => console.log("Couldnt fetch gameSets"));

            })
            .catch((error) => console.log("Failed fetch from API :", error));
    }
}

/**
 * This function disables the buttons in the quiz questions after the user clicked one entry
 * as to prevent the user from selecting several answers per question.
 * @param answers - all answers from the api to the current question.
 * */
function disableDivs(answers){
    answers.forEach((entry) => {
        document.getElementById(entry[0]).style.pointerEvents = "none";
    })
}

/**
 * This function enables the buttons in the quiz questions again.
 * @param answers - all answers from the api to the current question.
 * */
function enableDivs(answers){
    answers.forEach((entry) => {
        document.getElementById(entry[0]).setAttribute('style', '');
    })
}

var timerInterval = null;

export const startTimer = (gameID, gameSetID) => {
    return(dispatch, getState, {getFirestore, getFirebase}) => {
        //const firestore = getFirestore();
        //const uid = getState().firebase.auth.uid;
        dispatch({type: "INITIALIZE_TIMER", payload: 1000});
        timerInterval = setInterval(() => {
            var currentTimerVal = getState().game.questionTimer;
            if(currentTimerVal === 0){
                dispatch(verifyQuestion(gameID, "TIMER_OUT", gameSetID));
                dispatch({type: "STOP_TIMER", payload: currentTimerVal});
                clearInterval(timerInterval);

            }else{
                dispatch({type: "DECREMENT_TIMER", payload: currentTimerVal-1})
            }

        },1000);
    }
}

export const forfeitGameSet = (gameID) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const game = getState().firestore.data.games[gameID];
        const currentGameSet = game.currentSet;
        const opponentUsername = uid === game.userID1 ? game.user2Name : game.user1Name;
        var hasBeenAnsweredBy = 0;
        if(uid === game.userID1){
            firestore.collection('games').doc(gameID).collection('gameSets').doc(currentGameSet).get()
                .then((docRef) => {
                    hasBeenAnsweredBy = docRef.data().hasBeenAnsweredBy +1;
                    let answersToBeUpdated = docRef.data().questions;
                    answersToBeUpdated.resp[0]["p1Score"] = 0;
                    answersToBeUpdated.resp[1]["p1Score"] = 0;
                    answersToBeUpdated.resp[2]["p1Score"] = 0;
                    docRef.ref.update({
                        score: 0,
                        activeQuestion: 0,
                        questions: answersToBeUpdated,
                        hasBeenAnsweredBy: docRef.data().hasBeenAnsweredBy +1
                    }).then(() => {
                        firestore.collection('games').doc(gameID).update({
                            turn: game.userID2
                        }).then(() => console.log("Updated turn"))
                            .catch((error) => console.log("Failed to update turn"))
                    })
                        .catch((error) => console.log("Failed to update score for forfeit ", error));
                }).catch((error) => console.log("Couldn't fetch gameSets"));
        }
        else{
            firestore.collection('games').doc(gameID).collection('gameSets').doc(currentGameSet).get()
                .then((docRef) => {
                    hasBeenAnsweredBy = docRef.data().hasBeenAnsweredBy +1;
                    let answersToBeUpdated = docRef.data().questions;
                    answersToBeUpdated.resp[0]["p2Score"] = 0;
                    answersToBeUpdated.resp[1]["p2Score"] = 0;
                    answersToBeUpdated.resp[2]["p2Score"] = 0;
                    docRef.ref.update({
                        score: 0,
                        activeQuestion: 0,
                        questions: answersToBeUpdated,
                        hasBeenAnsweredBy: docRef.data().hasBeenAnsweredBy +1
                    }).then(() => {
                        firestore.collection('games').doc(gameID).update({
                            turn: game.userID1
                        }).then(() => console.log("Updated turn"))
                            .catch((error) => console.log("Failed to update turn"))
                    })
                        .catch((error) => console.log("Failed to update score for forfeit ", error));
                }).catch((error) => console.log("Couldn't fetch gameSets"));
        }
        dispatch(gameFinishedVerification(gameID,hasBeenAnsweredBy, opponentUsername));


    }
}

export const stopTimer = () => {
    return(dispatch, getState) => {
        var currentTimer = getState().game.questionTimer;
        dispatch({type: "STOP_TIMER", payload: currentTimer});
        clearInterval(timerInterval);
    }
}

export const resetHasChosenCategory = (gameID) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('games').doc(gameID).update({
            hasChosenCategory: false
        }).then(() => dispatch({type: "RESTORED_HAS_CHOSEN_CATEGORY_SUCCESS"}))
            .catch((error) => dispatch({ type: "RESTORED_HAS_CHOSEN_CATEGORY_FAILURE", error}));
    }
}

export const gameFinishedVerification = (gamingID, hasBeenAnsweredBy, opponentUsername) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const userID = getState().firebase.auth.uid;
        const yourUsername = getState().firebase.profile.userName;
        const myPhotoURL = getState().firebase.profile.photoURL;
        firestore.collection('games').doc(gamingID).collection('gameSets').get()
            .then((querySnapshot) => {
                if(querySnapshot.size === 3 && hasBeenAnsweredBy === 2){
                    firestore.collection('games').doc(gamingID).get()
                        .then((document) => {
                            const p1Score = document.data().p1Score;
                            const p2Score = document.data().p2Score;
                            const uid1 = document.data().userID1;
                            const uid2 = document.data().userID2;

                            let result = decideWinner(p1Score, p2Score, userID, uid1);
                            const opponentId = (uid1 === userID) ? uid2 : uid1;

                            if (result === 1) {
                                firestore.collection('userStats').doc(userID).update({
                                    wins: firebase.firestore.FieldValue.increment(1),
                                    mlRating: firebase.firestore.FieldValue.increment(3)
                                })
                                    .then()
                                    .catch((err) => console.log(err, 'couldnt update player win count'));

                                firestore.collection('userStats').doc(opponentId).update({
                                    losses: firebase.firestore.FieldValue.increment(1),
                                    mlRating: firebase.firestore.FieldValue.increment(-3)
                                })
                                    .then()
                                    .catch((err) => console.log(err, 'couldnt update player loss count'));

                                firestore.collection('notifications').add({
                                    notificationMessage: "Game over against " + opponentUsername + ". You Won! ",
                                    toUser: yourUsername,
                                    fromUser: opponentUsername,
                                    toUserID: userID,
                                    fromUserID: opponentId,
                                    linkTo: "/game-finished/" + gamingID,
                                    createdAt: new Date(),
                                    notificationType: "gameOverYouWon",
                                    fromUserPhotoURL: myPhotoURL,
                                    requestID: null
                                })
                                    .then()
                                    .catch((err) => console.log(err, 'something went wrong updating notification collection'));

                                firestore.collection('notifications').add({
                                    notificationMessage: "Game over against " + yourUsername + ". You Lost! ",
                                    toUser: opponentUsername,
                                    fromUser: yourUsername,
                                    toUserID: opponentId,
                                    fromUserID: userID,
                                    linkTo: "/game-finished/" + gamingID,
                                    createdAt: new Date(),
                                    notificationType: "gameOverYouLost",
                                    fromUserPhotoURL: myPhotoURL,
                                    requestID: null
                                })
                                    .then()
                                    .catch((err) => console.log(err, 'something went wrong updating notification collection'));

                            }
                            else if (result === -1) {
                                firestore.collection('userStats').doc(userID).update({
                                    losses: firebase.firestore.FieldValue.increment(1),
                                    mlRating: firebase.firestore.FieldValue.increment(-3)
                                })
                                    .then()
                                    .catch((err) => console.log(err, 'couldnt update player loss count'));

                                firestore.collection('userStats').doc(opponentId).update({
                                    wins: firebase.firestore.FieldValue.increment(1),
                                    mlRating: firebase.firestore.FieldValue.increment(3)
                                })
                                    .then()
                                    .catch((err) => console.log(err, 'couldnt update player win count'));

                                firestore.collection('notifications').add({
                                    notificationMessage: "Game over against " + opponentUsername + ". You Lost! ",
                                    toUser: yourUsername,
                                    fromUser: opponentUsername,
                                    toUserID: userID,
                                    fromUserID: opponentId,
                                    linkTo: "/game-finished/" + gamingID,
                                    createdAt: new Date(),
                                    notificationType: "gameOverYouLost",
                                    fromUserPhotoURL: myPhotoURL,
                                    requestID: null
                                })
                                    .then()
                                    .catch((err) => console.log(err, 'something went wrong updating notification collection'));

                                firestore.collection('notifications').add({
                                    notificationMessage: "Game over against " + yourUsername + ". You Won! ",
                                    toUser: opponentUsername,
                                    fromUser: yourUsername,
                                    toUserID: opponentId,
                                    fromUserID: userID,
                                    linkTo: "/game-finished/" + gamingID,
                                    createdAt: new Date(),
                                    notificationType: "gameOverYouWon",
                                    fromUserPhotoURL: myPhotoURL,
                                    requestID: null
                                })
                                    .then()
                                    .catch((err) => console.log(err, 'something went wrong updating notification collection'));

                            }
                            else {
                                firestore.collection('notifications').add({
                                    notificationMessage: "Game over against " + yourUsername + ". It's a tie! ",
                                    toUser: opponentUsername,
                                    fromUser: yourUsername,
                                    toUserID: opponentId,
                                    fromUserID: userID,
                                    linkTo: "/game-finished/" + gamingID,
                                    createdAt: new Date(),
                                    notificationType: "gameOverTie",
                                    fromUserPhotoURL: myPhotoURL,
                                    requestID: null
                                })
                                    .then()
                                    .catch((err) => console.log(err, 'something went wrong updating notification collection'));

                                firestore.collection('notifications').add({
                                    notificationMessage: "Game over against " + opponentUsername + ". It's a tie! ",
                                    toUser: yourUsername,
                                    fromUser: opponentUsername,
                                    toUserID: userID,
                                    fromUserID: opponentId,
                                    linkTo: "/game-finished/" + gamingID,
                                    createdAt: new Date(),
                                    notificationType: "gameOverTie",
                                    fromUserPhotoURL: myPhotoURL,
                                    requestID: null
                                })
                                    .then()
                                    .catch((err) => console.log(err, 'something went wrong updating notification collection'));

                            }
                            firestore.collection('games').doc(gamingID).update({
                                redirectTo: `${'/game-finished/' + gamingID}`,
                                gameIsFinished: true,
                                timeOfGameFinished: new Date()

                            }).then()
                                .catch((error) => console.log("SOmething went wrong updating redirecTo"));


                        })
                        .catch((error) => console.log("Could'nt get game data"));

                }
            }).catch((error) => console.log("Something trying to finish wrong :", error));
    }
}

/**
 * This function handles the questions and the users answers. After checking
 * if the user answered correctly or not, it updates the scores accordingly.
 * It goes to the next question unless all questions (3) has been answered.
 * In which case it either ends the game and decides a winner, or starts a new gameset
 * and changes the category and questions.
 * @param gamingID - the id of the current game,
 * @param answer - the answer that the user has selected,
 * @param gameSetID - the id of the current gameSet.
 * @returns - dispatches success/failure depending on outcome.
 * */
// TODO - thoroughly go through this code and add comments where necessary.
export const verifyQuestion = (gamingID, answer, gameSetID) => {
    return(dispatch, getState, {getFirestore, getFirebase}) => {
        const firestore = getFirestore();
        const userID = getState().firebase.auth.uid;
        let User1ID = null;
        let opponentUsername = "";
        let myPhotoURL = getState().firestore.data.users[userID].photoURL;

        firestore.collection('games').doc(gamingID).get()
            .then((docRef) => {
                User1ID = docRef.data().userID1;

                if(userID === User1ID) {
                    opponentUsername = docRef.data().user2Name;
                } else {
                    opponentUsername = docRef.data().user1Name;
                }

                firestore.collection('games').doc(gamingID).collection('gameSets').doc(gameSetID).get()
                    .then((docRef) => {
                        var activeQuestion = docRef.data().activeQuestion;
                        var correctAnswers = docRef.data().questions.resp[docRef.data().activeQuestion].correct_answers;
                        var correctAnswersRes = {
                            answer_a: "",
                            answer_b: "",
                            answer_c: "",
                            answer_d: "",
                            answer_e: "",
                            answer_f: ""
                        };
                        Object.entries(correctAnswers).forEach((entry) => {
                            correctAnswersRes[entry[0].substring(0,8)] = entry[1];
                        })

                        let allAnswers = Object.entries(correctAnswersRes).filter((entry) => {
                            return docRef.data().questions.resp[docRef.data().activeQuestion].answers[entry[0]] !== null;
                        })

                        let correctAnswerToQuestion = allAnswers.filter((answer) => {
                            return answer[1] === "true";
                        });

                        var score = docRef.data().score;
                        var scorePerQuestion = 0;
                        var finalScore = score;

                        activeQuestion += 1;
                        var currentQuestion = activeQuestion;

                        if (activeQuestion === 3){
                            activeQuestion = 0;
                        }

                        let questionsToBeUpdated = docRef.data().questions;

                        if(correctAnswersRes[answer] === "true"){
                            var currentTimer = getState().game.questionTimer;
                            score += currentTimer;
                            scorePerQuestion = currentTimer;
                            finalScore = score;
                            document.getElementById(answer).style.backgroundColor = "green";
                        }
                        else if (answer === "TIMER_OUT"){
                            correctAnswerToQuestion.forEach((entry) => {
                                document.getElementById(entry[0]).style.backgroundColor = "green";
                            })
                        }
                        else {
                            document.getElementById(answer).style.backgroundColor = "red";
                            correctAnswerToQuestion.forEach((entry) => {
                                document.getElementById(entry[0]).style.backgroundColor = "green";
                            })
                        }

                        if(userID === User1ID){
                            questionsToBeUpdated.resp[docRef.data().activeQuestion]["p1Score"] = scorePerQuestion;
                            questionsToBeUpdated.resp[docRef.data().activeQuestion]["p1ChosenAnswer"] = answer;
                        } else{
                            questionsToBeUpdated.resp[docRef.data().activeQuestion]["p2Score"] = scorePerQuestion;
                            questionsToBeUpdated.resp[docRef.data().activeQuestion]["p2ChosenAnswer"] = answer;
                        }
                        disableDivs(allAnswers);
                        docRef.ref.update({
                            score: score,
                            questions: questionsToBeUpdated
                        }).then(() => {
                            dispatch({type: "UPDATED_SCORE_SUCCESS"});
                            setTimeout(() => {
                                if(currentQuestion !== 3){
                                    enableDivs(allAnswers);

                                    docRef.ref.update({
                                        activeQuestion: activeQuestion
                                    }).then(() => {
                                        dispatch({type: "UPDATED_ACTIVE_QUESTION_SUCCESS"})
                                        dispatch(startTimer(gamingID, gameSetID));
                                    }).catch((error) => dispatch({type: "UPDATED_ACTIVE_QUESTION_FAILURE", error}));
                                }
                            }, 3000);
                        }).catch((error) => dispatch({type: "UPDATED_SCORE_FAILURE", error}));


                        if(currentQuestion === 3){
                            var hasBeenAnsweredByTemp = (docRef.data().hasBeenAnsweredBy + 1);
                            docRef.ref.update({
                                hasBeenAnsweredBy: (docRef.data().hasBeenAnsweredBy + 1)
                            })
                                .then(() => {
                                    firestore.collection('games').doc(gamingID).get()
                                        .then((doc) => {
                                            let playerShouldSelectCategory = userID;
                                            if (hasBeenAnsweredByTemp === 2) {
                                                playerShouldSelectCategory = userID;
                                            }
                                            else {
                                                playerShouldSelectCategory = doc.data().shouldCreateNewGameSet;
                                            }
                                            setTimeout(() => {
                                                dispatch({type: 'REDIRECT', payload: `${'/game-landing/' + gamingID}`});
                                                dispatch({type: 'RESTORE_REDIRECT_TO'});
                                                docRef.ref.update({
                                                    score: 0,
                                                    activeQuestion: 0
                                                }).then()
                                                    .catch((error) => console.log("error, ", error));
                                            }, 3000)

                                            if(doc.data().turn === doc.data().userID1){
                                                const theTurn = (hasBeenAnsweredByTemp === 2) ? userID : doc.data().userID2;
                                                doc.ref.update({
                                                    p1Score: doc.data().p1Score + finalScore,
                                                    turn: theTurn,
                                                    shouldCreateNewGameSet: playerShouldSelectCategory
                                                }).then(() => {
                                                    if(theTurn === doc.data().userID2){
                                                        firestore.collection('notifications').add({
                                                            notificationMessage: "It's your turn to play in this game",
                                                            toUser: doc.data().user2Name,
                                                            fromUser: doc.data().user1Name,
                                                            toUserID: doc.data().userID2,
                                                            fromUserID: doc.data().userID1,
                                                            linkTo: "/game-landing/" + gamingID,
                                                            createdAt: new Date(),
                                                            notificationType: "gameSwitchYourTurn",
                                                            fromUserPhotoURL: myPhotoURL,
                                                            requestID: null
                                                        })
                                                            .then()
                                                            .catch((err) => console.log(err, 'something went wrong updating notification collection'));
                                                    }
                                                })
                                                    .catch((error) => console.log("Something went wrong updating player 1 score"));
                                            } else {
                                                const theTurn = (hasBeenAnsweredByTemp === 2) ? userID : doc.data().userID1;
                                                doc.ref.update({
                                                    p2Score: doc.data().p2Score + finalScore,
                                                    turn: theTurn,
                                                    shouldCreateNewGameSet: playerShouldSelectCategory
                                                }).then(() => {
                                                    if(theTurn === doc.data().userID1){
                                                        firestore.collection('notifications').add({
                                                            notificationMessage: "It's your turn to play in this game",
                                                            toUser: doc.data().user1Name,
                                                            fromUser: doc.data().user2Name,
                                                            toUserID: doc.data().userID1,
                                                            fromUserID: doc.data().userID2,
                                                            linkTo: "/game-landing/" + gamingID,
                                                            createdAt: new Date(),
                                                            notificationType: "gameSwitchYourTurn",
                                                            fromUserPhotoURL: myPhotoURL,
                                                            requestID: null
                                                        })
                                                            .then()
                                                            .catch((err) => console.log(err, 'something went wrong updating notification collection'));
                                                    }

                                                })
                                                    .catch((error) => console.log("Something went wrong updating player 2 score"));
                                            }
                                        })
                                        .catch((err) => console.log(err));
                                        dispatch(gameFinishedVerification(gamingID, hasBeenAnsweredByTemp, opponentUsername));

                                })
                                .catch((err) => console.log(err, 'error updating round over thingie'));
                        }
                    })
                    .catch((error) => console.log("Something went wrong: ", error));


            }).catch((error) => console.log("could not fetch game ", error));


    }
}

/**
 * This func will decide who won the game
 * @param gamingID -- the id of the current game
 * @param currentUserID -- the ID of the current user
 * @param firestore -- the firestore
 * @returns: 1, 0 or -1 depending on who won.
 * 1 = p1 won
 * 0 = tie
 * -1 = p2 won
 */
function decideWinner(p1Score, p2Score, currentUserID, uid1){
    let p1Result = null;
    let p2Result = null;

    if(p1Score === p2Score){
        return 0;
    }
    if (currentUserID === uid1){
        p1Result = (p1Score - p2Score);
    }
    else {
        p2Result = (p2Score - p1Score);
    }
    if (p1Result){
        if(p1Result > 0) {
            return 1;
        }
        else {
            return -1
        }
    }
    else {
        if(p2Result > 0){
            return 1
        }
        else {
            return -1
        }
    }
}


/**
 * This function sets the redirectTo to null
 * @returns - dispatch of type restore_redirect_to. */
export const restoreRedirectTo = () => {
    return(dispatch) => {
        dispatch({type: 'RESTORE_REDIRECT_TO'});
    }
}

/**
 * This function restores the redirect, same as above, but in the database - firebase.
 * @returns - dispatch of type success or failure depending on state. */
export const restoreRedirectFirebase = (gamingID) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('games').doc(gamingID).update({
            redirectTo: null
        }).then(() => dispatch({type: "RESTORE_FIREBASE_REDIRECT_SUCCESS"}))
            .catch((error) => dispatch({type: "RESTORE_FIREBASE_REDIRECT_FAILURE"}));
    }
}
