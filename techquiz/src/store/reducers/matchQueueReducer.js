const initState = {
    matchMakingError: null,
    createdGameId: null
}

const matchQueueReducer = (state = initState, action) => {
    switch (action.type){
        case 'ADDED_TO_MATCH_QUEUE_SUCCESS':
            console.log('added to match queue success')
            return{
                ...state,
                matchMakingError : null,
                createdGameId: action.payload
            }
        case 'ADDED_TO_MATCH_QUEUE_FAILURE':
            console.log('FAILURE added to match queue FAILURE')
            return{
                ...state,
                matchMakingError: 'Added to match queue failed',
                createdGameId: null
            }
        default:
            return state;
    }
}

export default matchQueueReducer;
