import React from 'react'

const SignIn = (props) => {
    const [credentials, setCredentials] = React.useState({
        email: '',
        password: ''
    });
    const changeHandler = e => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return(
        <div className="container">
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

    )
}

export default SignIn
