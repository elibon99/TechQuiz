import React from 'react';
import {Redirect} from 'react-router-dom';
import FriendItem from "./FriendItem";

const FriendLanding = ({auth, friendList}) => {
    if(!auth.uid){
        return <Redirect to="/signin"/>
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col s12 m4">
                    <h5 className="center">
                        Friend Requests
                    </h5>
                    <div className="col s12 m12">

                        <div className="card">
                            <div className="card-content">
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="col s12 m8">
                        <h5 className="center">
                            Friends
                        </h5>
                        <FriendItem/>
                        <FriendItem/>
                        <FriendItem/>
                        <FriendItem/>
                        <FriendItem/>
                </div>
            </div>
        </div>
    )
}

export default FriendLanding;
