const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type){
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
        default:
            return state;
    }
}

export default authReducer