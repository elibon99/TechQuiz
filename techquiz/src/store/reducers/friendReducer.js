const initState = {
    usernameFriends: "",
    usernameFindGame: "",
    addFriendError: null,
    addFriendSuccess: null,
    friendRequestAnswerError : null,
    friendRequestAnswerSuccess : null,
    createdFriendGameSuccess: null,
    createdFriendGameError: null,
    redirectTo: null
}

const friendReducer = (state = initState, action) => {
    switch (action.type){
        case 'CHANGE_USER_SEARCH_FRIENDS':
            return{
                ...state,
                usernameFriends: action.payload
            }
        case 'CHANGE_USER_SEARCH_FIND_GAME':
            return{
                ...state,
                usernameFindGame: action.payload
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
        case 'CREATED_FRIEND_GAME_SUCCESS':
            return{
                ...state,
                createdFriendGameSuccess: 'successfully created game with friend',
                redirectTo: action.payload
            }
        case 'CREATED_FRIEND_GAME_FAILURE':
            return {
                ...state,
                createdFriendGameError: action.err.message
            }
        case 'RESTORE_REDIRECT_TO':
            return {
                ...state,
                redirectTo: null
            }
        default:
            return state;
    }
}

export default friendReducer;
