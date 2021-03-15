import React from 'react'

const SignUp = () => {
    return(
        <div className="container">
            <form className="white"
                  onSubmit={(e) => {e.preventDefault()}}>
                <h5 className="grey-text text-darken-3">Sign up</h5>
                <div className="input-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username"
                           onChange={(e) => {e.preventDefault()}}/>
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email"
                           onChange={(e) => {e.preventDefault()}}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"
                           onChange={(e) => {e.preventDefault()}}/>
                </div>
                <div className="input-field">
                    <button className="btn blue lighten-1 z-depth-0">Sign Up</button>
                </div>
            </form>
        </div>

    )
}

export default SignUp
