import React from 'react'

const SignIn = () => {
    return(
        <div className="container">
            <form className="white"
                  onSubmit={(e) => {e.preventDefault()}}>
                <h5 className="grey-text text-darken-3">Sign in</h5>
                <div className="input-field">
                    <label htmlFor="username">Username/Email</label>
                    <input type="text" id="username"
                           onChange={(e) => {e.preventDefault()}}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"
                           onChange={(e) => {e.preventDefault()}}/>
                </div>
                <div className="input-field">
                    <button className="btn blue lighten-1 z-depth-0">Sign In</button>
                </div>
            </form>
        </div>

    )
}

export default SignIn
