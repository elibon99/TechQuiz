
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
export const generateCategories = () => {
    return(dispatch) => {
        let selectedCats = getCategories();
        dispatch({type: 'GENERATE_CATEGORIES_SUCCESS', payload: selectedCats});
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

        console.log(category, " choosen category")
        const params = {tags: category, limit: "3"};
        const pp = new URLSearchParams(params);
        const test = URL + pp;
        console.log(test)

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
                firestore.collection('games').doc(gamingID).collection('gameSets').add({
                    questions: {resp},
                    score: 0,
                    category: category,
                    activeQuestion: 0,
                    hasBeenAnsweredBy: 0
                })
                    .then((doc) => {
                        firestore.collection('games').doc(gamingID).update({
                            currentSet: doc.id
                        })
                            .then(() => console.log('added currentSet to games collection'))
                            .catch((err) => console.log(err, 'something went wrong inside currentset add'));
                        console.log("Updated games with gameSets questions")
                    })
                    .catch((error) => console.log("Error updating games: ", error));
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
        dispatch({type: "INITIALIZE_TIMER", payload: 10});
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

export const stopTimer = () => {
    return(dispatch, getState) => {
        var currentTimer = getState().game.questionTimer;
        dispatch({type: "STOP_TIMER", payload: currentTimer});
        clearInterval(timerInterval);
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
        const firebase = getFirebase();
        const userID = getState().firebase.auth.uid;
        firestore.collection('games').doc(gamingID).collection('gameSets').doc(gameSetID).get()
            .then((docRef) => {
                var activeQuestion = docRef.data().activeQuestion;
                var correctAnswers = docRef.data().questions.resp[docRef.data().activeQuestion].correct_answers;
                console.log(answer, "this is the answer")
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

                console.log(correctAnswersRes, "The correct answers after filtering")

                let correctAnswerToQuestion = allAnswers.filter((answer) => {
                    return answer[1] === "true";
                });
                console.log(correctAnswerToQuestion, 'right answer in Q');

                var score = docRef.data().score;

                var finalScore = score;

                activeQuestion += 1;
                var finalQuestion = activeQuestion;

                if (activeQuestion === 3){
                    activeQuestion = 0;
                }
                console.log(correctAnswersRes, "all answers")
                console.log(answer, "Choosen answer")

                dispatch({type: "SET_CHOSEN_ANSWER", payload: answer});

                if(correctAnswersRes[answer] === "true"){
                    console.log("correct answer");
                    var currentTimer = getState().game.questionTimer;
                    score += currentTimer;
                    console.log("your score after correct answer, : ", score)
                    finalScore = score;
                    dispatch({type: "CORRECT_ANSWER_ADDED", payload: correctAnswersRes})
                    console.log(answer, " this is the answer")
                    document.getElementById(answer).style.backgroundColor = "green";
                    docRef.ref.update({
                        score: score
                    }).then(() => console.log("Updated score"))
                        .catch((error) => console.log("Error updating score: ", error))
                    disableDivs(allAnswers);
                    setTimeout(() => {
                        if(finalQuestion !== 3) {
                            // document.getElementById(answer).style.backgroundColor = "";
                            // document.getElementById(answer).style.pointerEvents = "";
                            enableDivs(allAnswers);

                            docRef.ref.update({
                                activeQuestion: activeQuestion
                            }).then(() => {

                                dispatch({type: "CORRECT_ANSWER_UPDATED"});
                                dispatch({type: "RESTORE_CORRECT_ANSWER"});
                                dispatch(startTimer(gamingID, gameSetID));
                            })
                                .catch((error) => dispatch({type: "CORRECT_ANSWER_FAILURE", error}));
                        } else{
                            docRef.ref.update({
                                score: score
                            }).then(() => {dispatch({type: "CORRECT_ANSWER_UPDATED"});})
                                .catch((error) => dispatch({type: "CORRECT_ANSWER_FAILURE", error}))
                        }
                    }, 3000);
                }

                else if (answer === "TIMER_OUT"){
                    console.log("TIMER OUT")
                    dispatch({type: "WRONG_ANSWER"});
                    correctAnswerToQuestion.forEach((entry) => {
                        document.getElementById(entry[0]).style.backgroundColor = "green";
                    })
                    disableDivs(allAnswers);
                    setTimeout(() => {
                        if(finalQuestion !== 3) {
                            // document.getElementById(answer).style.backgroundColor = "";
                            // document.getElementById(answer).style.pointerEvents= "";
                            // document.getElementById(answer).setAttribute('style', '');
                            // correctAnswerToQuestion.forEach((entry) => {
                            //     // document.getElementById(entry[0]).style.backgroundColor = "";
                            //     // document.getElementById(entry[0]).style.pointerEvents = "";
                            //     document.getElementById(entry[0]).setAttribute('style', '');
                            // })
                            enableDivs(allAnswers);

                            docRef.ref.update({
                                activeQuestion: activeQuestion
                            }).then(() => {
                                dispatch({type: "RESTORE_CORRECT_ANSWER"});
                                dispatch({type: "ACTIVE_QUESTION_UPDATED"});
                                dispatch(startTimer(gamingID, gameSetID));
                            }).catch((error) => dispatch({type: "ACTIVE_QUESTION_FAILURE"}, error));
                        }
                    }, 3000)

                }
                else {
                    dispatch({type: "CORRECT_ANSWER_ADDED", payload: correctAnswersRes})
                    dispatch({type: "WRONG_ANSWER"});
                    console.log(answer, " this is the answer")
                    document.getElementById(answer).style.backgroundColor = "red";
                    correctAnswerToQuestion.forEach((entry) => {
                        document.getElementById(entry[0]).style.backgroundColor = "green";
                    })
                    disableDivs(allAnswers);
                    setTimeout(() => {
                        if(finalQuestion !== 3) {
                            // document.getElementById(answer).style.backgroundColor = "";
                            // document.getElementById(answer).style.pointerEvents= "";
                            // document.getElementById(answer).setAttribute('style', '');
                            // correctAnswerToQuestion.forEach((entry) => {
                            //     // document.getElementById(entry[0]).style.backgroundColor = "";
                            //     // document.getElementById(entry[0]).style.pointerEvents = "";
                            //     document.getElementById(entry[0]).setAttribute('style', '');
                            // })
                            enableDivs(allAnswers);

                            docRef.ref.update({
                                activeQuestion: activeQuestion
                            }).then(() => {
                                dispatch({type: "RESTORE_CORRECT_ANSWER"});
                                dispatch({type: "ACTIVE_QUESTION_UPDATED"});
                                dispatch(startTimer(gamingID, gameSetID));
                            }).catch((error) => dispatch({type: "ACTIVE_QUESTION_FAILURE"}, error));
                        }
                    }, 3000)
                }

                if(finalQuestion === 3){
                    var hasBeenAnsweredByTemp = (docRef.data().hasBeenAnsweredBy + 1);
                    docRef.ref.update({
                        hasBeenAnsweredBy: (docRef.data().hasBeenAnsweredBy + 1)
                    })
                        .then(() => {
                            firestore.collection('games').doc(gamingID).get()
                                .then((doc) => {
                                    let playerShouldSelectCategory = userID;
                                    if (hasBeenAnsweredByTemp === 2) {
                                        console.log('round over, current user should select new cat');
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
                                        }).then(() => console.log(""))
                                            .catch((error) => console.log("error, ", error));
                                    }, 3000)

                                    if(doc.data().turn === doc.data().userID1){
                                        console.log("Update player 1 score");
                                        const theTurn = (hasBeenAnsweredByTemp === 2) ? userID : doc.data().userID2;
                                        doc.ref.update({
                                            p1Score: doc.data().p1Score + finalScore,
                                            turn: theTurn,
                                            shouldCreateNewGameSet: playerShouldSelectCategory
                                        }).then(() => console.log("Updated plsfsfsfsdfsdfdsayer 1 score"))
                                            .catch((error) => console.log("SOmething went wrong"));
                                    } else {
                                        console.log("Update player 2 score");
                                        const theTurn = (hasBeenAnsweredByTemp === 2) ? userID : doc.data().userID1;
                                        doc.ref.update({
                                            p2Score: doc.data().p2Score + finalScore,
                                            turn: theTurn,
                                            shouldCreateNewGameSet: playerShouldSelectCategory
                                        }).then(() => console.log("Updated psdfsdfsdfsdflayer 1 score"))
                                            .catch((error) => console.log("SOmething went wrong"));
                                    }
                                })
                                .catch((err) => console.log(err));
                            firestore.collection('games').doc(gamingID).collection('gameSets').get()
                                .then((querySnapshot) => {
                                    if(querySnapshot.size === 3 && hasBeenAnsweredByTemp === 2){
                                        firestore.collection('games').doc(gamingID).get()
                                            .then((document) => {
                                                const p1Score = document.data().p1Score;
                                                const p2Score = document.data().p2Score;
                                                const uid1 = document.data().userID1;
                                                const uid2 = document.data().userID2;

                                                let result = decideWinner(p1Score, p2Score, userID, uid1);
                                                console.log(result, " this is the result")
                                                const opponentId = (uid1 === userID) ? uid2 : uid1;
                                                console.log(opponentId, 'that was the opponents user id');

                                                if (result === 1) {
                                                    firestore.collection('userStats').doc(userID).update({
                                                        wins: firebase.firestore.FieldValue.increment(1),
                                                        mlRating: firebase.firestore.FieldValue.increment(3)
                                                    })
                                                        .then(() => console.log('updated player win count'))
                                                        .catch((err) => console.log(err, 'couldnt update player win count'));

                                                    firestore.collection('userStats').doc(opponentId).update({
                                                        losses: firebase.firestore.FieldValue.increment(1),
                                                        mlRating: firebase.firestore.FieldValue.increment(-3)
                                                    })
                                                        .then(() => console.log('updated player loss count'))
                                                        .catch((err) => console.log(err, 'couldnt update player loss count'));
                                                }
                                                else if (result === -1) {
                                                    firestore.collection('userStats').doc(userID).update({
                                                        losses: firebase.firestore.FieldValue.increment(1),
                                                        mlRating: firebase.firestore.FieldValue.increment(-3)
                                                    })
                                                        .then(() => console.log('updated player loss count'))
                                                        .catch((err) => console.log(err, 'couldnt update player loss count'));

                                                    firestore.collection('userStats').doc(opponentId).update({
                                                        wins: firebase.firestore.FieldValue.increment(1),
                                                        mlRating: firebase.firestore.FieldValue.increment(3)
                                                    })
                                                        .then(() => console.log('updated player win count'))
                                                        .catch((err) => console.log(err, 'couldnt update player win count'));
                                                }
                                                else {
                                                    console.log('its a tie in else statement');
                                                }
                                                console.log("Want to change redirectTo in game collection");
                                                firestore.collection('games').doc(gamingID).update({
                                                    redirectTo: `${'/game-finished/' + gamingID}`,
                                                    gameIsFinished: true,
                                                    timeOfGameFinished: new Date()

                                                }).then(() => console.log("Updated redirectTO"))
                                                    .catch((error) => console.log("SOmething went wrong updating redirecTo"));


                                            })
                                            .catch((error) => console.log("Could'nt get game data"));

                                    }
                                }).catch((error) => console.log("Something trying to finish wrong :", error));

                        })
                        .catch((err) => console.log(err, 'error updating round over thingie'));
                }
            })
            .catch((error) => console.log("Something went wrong: ", error));
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
        console.log('its a tie');
        return 0;
    }
    if (currentUserID === uid1){
        console.log('logged in user is uid1');
        p1Result = (p1Score - p2Score);
    }
    else {
        console.log('logged in user is uid2');
        p2Result = (p2Score - p1Score);
    }
    if (p1Result){
        if(p1Result > 0) {
            console.log('p1 won');
            return 1;
        }
        else {
            console.log('p2 won');
            return -1
        }
    }
    else {
        if(p2Result > 0){
            console.log('p2 won');
            return 1
        }
        else {
            console.log('p1 won');
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
