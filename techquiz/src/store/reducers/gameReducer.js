const initState = {
    gameError: null,
    selectedCategories: null,
    isCorrectAnswer: null
}

const gameReducer = (state = initState, action) => {
    switch (action.type){
        case 'GENERATE_CATEGORIES_SUCCESS':
            return{
                ...state,
                gameError: null,
                selectedCategories: action.payload
            }
        case 'CORRECT_ANSWER_UPDATED':
            return {
                ...state,
                gameError: null,
                isCorrectAnswer: true

            }
        case 'CORRECT_ANSWER_FAILURE':
            return{
                ...state,
                gameError: "Couldn't update score"
            }
        case 'WRONG_ANSWER':
            return {
                ...state,
                isCorrectAnswer: false
            }
        default:
            return state;
    }
}

export default gameReducer
