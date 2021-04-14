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
