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
        let selectedCats = getCategories(categories);
        dispatch({type: 'GENERATE_CATEGORIES_SUCCESS', payload: selectedCats});
    }
}

function getCategories(categories){
    let selectedCategories = [];
    for(let i = 0; i < 4; i += 1){
        var randomIndex = Math.floor(Math.random() * (categories.length-1));
        selectedCategories.push(categories[randomIndex]);
        categories.splice(randomIndex, 1);
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
                    category: category
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
    return(dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('games').doc(gamingID).collection('gameSets').doc(gameSetID).get()
            .then((docRef) => {
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

                //console.log(correctAnswersRes, "the correct answers")
                var score = docRef.data().score;

                var finalScore = score;

                if(correctAnswersRes[answer] === "true"){
                    score += 10;
                    finalScore = score;
                    docRef.ref.update({
                        score: score
                    }).then(() => dispatch({type: "CORRECT_ANSWER_UPDATED"}))
                        .catch((error) => dispatch({type: "CORRECT_ANSWER_FAILURE"}, error));
                } else {
                    dispatch({type: "WRONG_ANSWER"});
                }

                if(docRef.data().activeQuestion === 2){
                    firestore.collection('games').doc(gamingID).get()
                        .then((doc) => {
                            if(doc.data().turn === doc.data().userID1){
                                doc.ref.update({
                                    p1Score: finalScore,
                                    turn: doc.data().userID2
                                }).then(() => console.log("Updated player 1 score"))
                                    .catch((error) => console.log("SOmething went wrong"));
                            }else{
                                doc.ref.update({
                                    p2Score: finalScore,
                                    turn: doc.data().userID1
                                }).then(() => console.log("Updated player 1 score"))
                                    .catch((error) => console.log("SOmething went wrong"));
                            }
                        })
                }
            })
            .catch((error) => console.log("Something went wrong: ", error));
    }
}
