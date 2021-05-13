const initState = {
    authError: null,
    profileInfoKey: 0
}

const authReducer = (state = initState, action) => {
    switch (action.type){
        case 'CHANGED_PROFILE_SUCCESS':
            return{
                ...state,
                profileInfoKey: (state.profileInfoKey + 1)
            }
        case 'LOGIN_SUCCESS':
            return{
                ...state,
                authError: null
            }
        case 'LOGIN_FAILURE':
            return{
                ...state,
                authError: 'Login failed'
            }
        case 'SIGNOUT_SUCCESS':
            return state;
        case 'SIGNOUT_FAILURE':
            return{
                ...state,
                authError: 'Logout failed'
            }
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_FAILURE':
            return{
                ...state,
                authError: action.err.message
            }
        case 'SIGNUP_FAILURE_NONUNIQUE':
            return{
                ...state,
                authError: action.payload
            }
        default:
            return state;
    }
}

export default authReducer
