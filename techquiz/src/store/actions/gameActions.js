// const categories = [
//     "Linux", "DevOps", "MySQL", "PHP", "BASH", "Dockers",
//     "HTML", "WordPress", "Laravel", "Kubernetes", "JavaScript"
// ]

const categories = [
    {category: "Linux", value: "Linux", tags: "Linux"},
    {category: "DevOps", value: "DevOps", tags: "DevOps"},
    {category: "MySQL", value: "SQL", tags: "MySQL"},
    {category: "PHP", value: "Code", tags:"PHP"},
    {category: "BASH", value: "bash", tags: "BASH"},
    {category: "Docker", value: "Docker", tags: "Docker"},
    {category: "HTML", value: "Code", tags: "HTML"},
    {category: "WordPress", value: "CMS", tags: "WordPress"},
    {category: "Laravel", value: "Code", tags: "Laravel"},
    {category: "Kubernetes", value: "", tags: "Kubernetes"},
    {category: "JavaScript", value: "Code", tags: "JavaScript"}
]



export const generateCategories = () => {
    return(dispatch) => {
        let selectedCats = getCategories();
        dispatch({type: 'GENERATE_CATEGORIES_SUCCESS', payload: selectedCats});
    }
}

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

const URL = "https://quizapi.io/api/v1/questions?";
const API_KEY  = "UwbOCHKVnP7pMftLcMxEB2vvycdJtFg7rOAWaEKR";

export const fetchQuestions = (gamingID, category) => {
    return(dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();

        console.log(category, " choosen category")
        const params = {tags: category, limit: "3"};
        const pp = new URLSearchParams(params);
        const test = URL + pp;
        console.log(test)

        fetch(URL + new URLSearchParams(params), {
            "method": "GET",
            "headers": {
                "X-API-KEY": API_KEY,
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            }
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


export const verifyQuestion = (gamingID, answer, gameSetID) => {
    return(dispatch, getState, {getFirestore, getFirebase}) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const userID = getState().firebase.auth.uid;

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

                var score = docRef.data().score;

                var finalScore = score;

                activeQuestion += 1;
                var finalQuestion = activeQuestion;

                if (activeQuestion === 3){
                    activeQuestion = 0;
                }
                console.log(correctAnswersRes, "correct answer")
                console.log(answer, "Choosen answer")

                if(correctAnswersRes[answer] === "true"){
                    console.log("correct answer");
                    score += 10;
                    finalScore = score;
                    docRef.ref.update({
                        score: score,
                        activeQuestion: activeQuestion
                    }).then(() => dispatch({type: "CORRECT_ANSWER_UPDATED"}))
                        .catch((error) => dispatch({type: "CORRECT_ANSWER_FAILURE"}, error));
                } else {
                    dispatch({type: "WRONG_ANSWER"});
                    docRef.ref.update({
                        activeQuestion: activeQuestion
                    }).then(() => dispatch({type: "ACTIVE_QUESTION_UPDATED"}))
                        .catch((error) => dispatch({type: "ACTIVE_QUESTION_FAILURE"}, error));
                }

                if(finalQuestion === 3){
                    var hasBeenAnsweredByTemp = (docRef.data().hasBeenAnsweredBy + 1);
                    docRef.ref.update({
                        score: 0,
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
                                    dispatch({type: 'REDIRECT', payload: `${'/game-landing/' + gamingID}`});
                                    dispatch({type: 'RESTORE_REDIRECT_TO'});
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
                                        let result = decideWinner(gamingID, userID, firestore);
                                        console.log(result, 'decide winner result');
                                        let opponentUserID = getOpponentID(gamingID, firestore, userID);
                                        console.log(opponentUserID, 'that was the opponents user id');
                                        if (result === 1) {
                                            firestore.collection('userStats').doc(userID).update({
                                                wins: firebase.firestore.FieldValue.increment(1),
                                                mlRating: firebase.firestore.FieldValue.increment(3)
                                            })
                                                .then(() => console.log('updated player win count'))
                                                .catch((err) => console.log(err, 'couldnt update player win count'));

                                            firestore.collection('userStats').doc(opponentUserID).update({
                                                losses: firebase.firestore.FieldValue.increment(1),
                                                mlRating: firebase.firestore.FieldValue.increment(-3)
                                            })
                                                .then(() => console.log('updated player loss count'))
                                                .catch((err) => console.log(err, 'couldnt update player loss count'));
                                        }
                                        if (result === -1) {
                                            firestore.collection('userStats').doc(userID).update({
                                                losses: firebase.firestore.FieldValue.increment(1),
                                                mlRating: firebase.firestore.FieldValue.increment(-3)
                                            })
                                                .then(() => console.log('updated player loss count'))
                                                .catch((err) => console.log(err, 'couldnt update player loss count'));

                                            firestore.collection('userStats').doc(opponentUserID).update({
                                                wins: firebase.firestore.FieldValue.increment(1),
                                                mlRating: firebase.firestore.FieldValue.increment(3)
                                            })
                                                .then(() => console.log('updated player win count'))
                                                .catch((err) => console.log(err, 'couldnt update player win count'));
                                        }
                                        else {
                                            console.log('its a tie');
                                        }
                                        console.log("Want to change redirectTo in game collection");
                                        firestore.collection('games').doc(gamingID).update({
                                            redirectTo: `${'/game-finished/' + gamingID}`
                                        }).then(() => console.log("Updated redirectTO"))
                                            .catch((error) => console.log("SOmething went wrong updating redirecTo"));
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
 * returns: 1, 0 or -1 depending on who won.
 * 1 = p1 won
 * 0 = tie
 * -1 = p2 won
 */
function decideWinner(gamingID, currentUserID, firestore){
    let p1Score = 0;
    let p2Score = 0;
    let uid1 = "";
    let p1Result = null;
    let p2Result = null;
    firestore.collection('games').doc(gamingID).get()
        .then((doc) => {
            p1Score = doc.data().p1Score;
            p2Score = doc.data().p2Score;
            uid1 = doc.data().userID1;

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
                    return -1
                }
                else {
                    console.log('p1 won');
                    return 1
                }
            }
        })
        .catch((err) => console.log(err, 'something went wrong deciding winner'));
}

function getOpponentID (gamingID, firestore, userID) {
    let uid1 = "";
    let uid2 = "";
    firestore.collection('games').doc(gamingID).get()
        .then((doc) => {
            uid1 = doc.data().userID1;
            uid2 = doc.data().userID2;
        })
        .catch((err) => console.log(err, 'couldnt get opponent ID'));
    if (userID === uid1){
        console.log('opponent user is userid2', uid2);
        return uid2;
    }
    else {
        console.log('opponent user is userid1', uid1);
        return uid1;
    }
}

export const restoreRedirectTo = () => {
    return(dispatch) => {
        dispatch({type: 'RESTORE_REDIRECT_TO'});
    }
}

export const restoreRedirectFirebase = (gamingID) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('games').doc(gamingID).update({
            redirectTo: null
        }).then(() => dispatch({type: "RESTORE_FIREBASE_REDIRECT_SUCCESS"}))
            .catch((error) => dispatch({type: "RESTORE_FIREBASE_REDIRECT_FAILURE"}));
    }
}
