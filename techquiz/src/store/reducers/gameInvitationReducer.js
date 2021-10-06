const initState = {
    gameInvitationError: null
}

const gameInvitationReducer = (state = initState, action) => {
    switch (action.type){
        case 'ACCEPTED_INVITATION_SUCCESS':
            return{
                ...state,
            }
        case 'ACCEPTED_INVITATION_FAILURE':
            return {
                ...state,
                gameInvitationError: action.error.message
            }
        case 'REJECTED_INVITATION_SUCCESS':
            return{
                ...state,
            }
        case 'REJECTED_INVITATION_FAILURE':
            return {
                ...state,
                gameInvitationError: action.error.message
            }
        case  'GAME_INVITATION_ADDED_SUCCESS':
            return {
                ...state,
            }
        case  'GAME_INVITATION_ERROR_FAILURE':
            return {
                ...state,
                gameInvitationError: action.error.message
            }
        default:
            return state;
    }
}

export default gameInvitationReducer;
