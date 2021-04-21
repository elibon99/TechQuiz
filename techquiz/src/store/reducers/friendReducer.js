const initState = {
    username: "",
    addFriendError: null,
    addFriendSuccess: null
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
        default:
            return state;
    }
}

export default friendReducer;
