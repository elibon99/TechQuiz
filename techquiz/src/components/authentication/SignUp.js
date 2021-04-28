import React from 'react'
import {Redirect} from 'react-router-dom'

/**
 * This components main focus is signing up users.
 * @param signUp(newUser) - a method that tries to sign up the user with the credentials:
 * (newUser): username, email, password.
 * @param auth - an object holding auth info,
 * @param authError - an object holding authError info,
 * */
const SignUp = ({signUp, auth, authError}) => {
    const [credentials, setCredentials] = React.useState({
        email: '',
        password: '',
        userName: ''
    });
    const changeHandler = e => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    if(auth.uid) return <Redirect to='/profile' />

    return(
        <div className="container">
            <form className="white"
                  onSubmit={(e) => {e.preventDefault(); signUp(credentials)}}>
                <h5 className="grey-text text-darken-3">Sign up</h5>
                <div className="input-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="userName" name="userName"
                           onChange={changeHandler}/>
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email"
                           onChange={changeHandler}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"
                           onChange={changeHandler}/>
                </div>
                <div className="input-field">
                    <button className="btn blue lighten-1 z-depth-0">Sign Up</button>
                    <div className="red-text center">
                        {authError ? <p>{authError}</p> : null}
                    </div>
                </div>
            </form>
        </div>

    )
}

export default SignUp
