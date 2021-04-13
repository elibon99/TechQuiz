const initState = {
    gameError: null,
    selectedCategories: null
}

const gameReducer = (state = initState, action) => {
    switch (action.type){
        case 'GENERATE_CATEGORIES_SUCCESS':
            return{
                ...state,
                gameError: null,
                selectedCategories: action.payload
            }
        default:
            return state;
    }
}

export default gameReducer
