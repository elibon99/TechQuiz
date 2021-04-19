const initState = {
    username: ""
}

const friendReducer = (state = initState, action) => {
    switch (action.type){
        case 'CHANGE_USERSEARCH':
            return{
                ...state,
                username: action.payload
            }
        default:
            return state;
    }
}

export default friendReducer;