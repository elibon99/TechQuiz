const initState = {
    gameError: null,
    selectedCategories: null,
    isCorrectAnswer: null,
    redirectTo : null
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
        case 'ACTIVE_QUESTION_UPDATED':
            return {
                ...state
            }
        case 'ACTIVE_QUESTION_FAILURE':
            return {
                ...state,
                gameError: "Couldn't update question"
            }
        case 'REDIRECT':
            return{
                ...state,
                redirectTo: action.payload
            }

        case 'RESTORE_REDIRECT_TO':
            return{
                ...state,
                redirectTo: null
            }
        case 'GAME_OVER_SUCCESS':
            return {
                ...state,
                redirectTo: action.payload
            }

        default:
            return state;
    }
}

export default gameReducer
