const categories = [
    "Linux", "DevOps", "MySQL", "PHP", "BASH", "Dockers",
    "HTML", "WordPress", "Laravel", "Kubernetes", "JavaScript"
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

export const chosenCategory = () => {
    return(dispatch) => {
        dispatch({type: 'SELECTED_CATEGORY_SUCCESS'});
    }
}
