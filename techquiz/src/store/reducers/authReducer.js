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
            console.log('login success')
            return{
                ...state,
                authError: null
            }
        case 'LOGIN_FAILURE':
            console.log('login failed')
            return{
                ...state,
                authError: 'Login failed'
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signed out successfully')
            return state;
        case 'SIGNOUT_FAILURE':
            console.log('signed out failure')
            return{
                ...state,
                authError: 'Logout failed'
            }
        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_FAILURE':
            console.log('signup error');
            return{
                ...state,
                authError: action.err.message
            }
        case 'SIGNUP_FAILURE_NONUNIQUE':
            console.log('signup error, nonunique username');
            return{
                ...state,
                authError: action.payload
            }
        default:
            return state;
    }
}

export default authReducer
