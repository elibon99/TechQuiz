export const setUsername = (userName) => {
    return(dispatch) => {
        dispatch({type: "CHANGE_USERSEARCH", payload: userName});
    }
}