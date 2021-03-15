import React from 'react'

const SignIn = () => {
    return(
        <div className="container">
            <form className="white">
                <h5 className="grey-text text-darken-3">Sign in</h5>
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
            </form>
        </div>

    )
}

export default SignIn
