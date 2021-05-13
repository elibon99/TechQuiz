const initState = {
    matchMakingError: null,
    redirectTo: null
}

const matchQueueReducer = (state = initState, action) => {
    switch (action.type){
        case 'ADDED_TO_MATCH_QUEUE_SUCCESS':
            return{
                ...state,
                matchMakingError : null,
            }
        case 'ADDED_TO_MATCH_QUEUE_FAILURE':
            return{
                ...state,
                matchMakingError: 'Added to match queue failed',
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

        default:
            return state;
    }
}

export default matchQueueReducer;
