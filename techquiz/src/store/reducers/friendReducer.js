const initState = {
    username: "",
    addFriendError: null,
    addFriendSuccess: null,
    friendRequestAnswerError : null,
    friendRequestAnswerSuccess : null
}

const friendReducer = (state = initState, action) => {
    switch (action.type){
        case 'CHANGE_USERSEARCH':
            return{
                ...state,
                username: action.payload
            }
        case 'ADD_FRIEND_SUCCESS':
            return{
                ...state,
                addFriendSuccess: 'friend added'
            }
        case 'ADD_FRIEND_FAILURE':
            return{
                ...state,
                addFriendError: action.err.message
            }
        case 'ACCEPTED_REQUEST_SUCCESS':
            return{
                ...state,
                friendRequestAnswerSuccess: 'friend successfully accepted'
            }
        case 'ACCEPTED_REQUEST_FAILURE':
            return{
                ...state,
                friendRequestAnswerError: action.err.message
            }
        case 'REJECTED_REQUEST_SUCCESS':
            return{
                ...state,
                friendRequestAnswerSuccess: 'friend successfully rejected'
            }
        case 'REJECTED_REQUEST_FAILURE':
            return{
                ...state,
                friendRequestAnswerError: action.err.message
            }
        default:
            return state;
    }
}

export default friendReducer;
