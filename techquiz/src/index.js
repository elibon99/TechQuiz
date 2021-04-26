import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware} from "redux";
import rootReducer from "./store/reducers/rootReducer";
import {Provider, useSelector} from "react-redux";
import thunk from "redux-thunk";
import {createFirestoreInstance, getFirestore} from "redux-firestore";
import {ReactReduxFirebaseProvider, getFirebase, isLoaded} from "react-redux-firebase";
import firebase from "./config/fbConfig";


const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})));

function AuthIsLoaded({children}){
    const auth = useSelector(state => state.firebase.auth)
    if(!isLoaded(auth)) return <div></div>

    return children;
}

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
};

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
                <App/>
            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);


