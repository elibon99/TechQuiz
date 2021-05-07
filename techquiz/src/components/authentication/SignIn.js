import React from 'react'
import {Redirect} from 'react-router-dom'

/**
 * This components main focus is signing in registered users.
 * @param props - all properties sent from the SignIn-presenter:
 * props.auth - an object holding auth info,
 * props.authError - an object holding authError info,
 * props.signIn(creds) - a method that tries to sign in the user.
 * */
const SignIn = (props) => {
    const [credentials, setCredentials] = React.useState({
        email: '',
        password: ''
    });
    const changeHandler = e => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    if(props.auth.uid) return <Redirect to='/profile' />
    return(
        <div className="container general-container">
            <div className="card general-card">
                <div className="card-content">
                    <form className="white"
                          onSubmit={e => {e.preventDefault(); props.signIn(credentials)}}>
                        <h5 className="grey-text text-darken-3">Sign in</h5>
                        <div className="input-field">
                            <label htmlFor="username">Username/Email</label>
                            <input type="text" id="username" name="email"
                                   onChange={changeHandler}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password"
                                   onChange={changeHandler}/>
                        </div>
                        <div className="input-field">
                            <button className="btn blue lighten-1 z-depth-0">Sign In</button>
                            <div className="red-text center">
                                {props.authError ? <p>{props.authError}</p> : null}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn
