import React from 'react';
import {Redirect} from 'react-router-dom';
import FriendItem from "./FriendItem";
import FriendRequestItem from "./FriendRequestItem";
import SentFriendRequestItem from "./SentFriendRequestItem";
import {Link} from "react-router-dom";

const FriendLanding = ({auth, friends, friendSearch, setUsername, friendRequests, sentFriendRequests, acceptFriendRequest, rejectFriendRequest, users}) => {
    if(!auth.uid){
        return <Redirect to="/signin"/>
    }
    return (
        <div>
        <h5 className="page-title">Friends</h5>
        <div className="container find-game-margin">

            <div className="card"><div className="card-content">
            <div className="row">
                <div className="col s12 m4">
                    <h5 className="grey-text text-darken-3 center">Friends Requests</h5>
                    <div className="col s12 m12">

                        <div className="card">
                            <div className="card-content">
                                {friendRequests ? Object.entries(friendRequests).map((request) => {
                                    return(
                                            <FriendRequestItem key={request[0]} request={request[1]} requestID={request[0]}
                                                               acceptFriendRequest={acceptFriendRequest}
                                                               rejectFriendRequest={rejectFriendRequest}/>
                                    )
                                }): <div className="center">No current friend requests</div>}
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content">
                                <div className="center">
                                    Pending friend requests
                                    { sentFriendRequests ? Object.entries(sentFriendRequests).map((request) => {
                                        return (
                                            <SentFriendRequestItem key={request[0]} request={request[1]}/>
                                        )
                                    }): <div>You have no pending friend requests</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="col s12 m8">
                        <form className="white"
                              onChange={(e) => {e.preventDefault();}}>
                            <h5 className="grey-text text-darken-3 center">Friends & Users</h5>
                            <div className="input-field">
                                <input type="text" id="userName" name="userName" placeholder="Search for users.."
                                       onChange={e => {setUsername(e.target.value)}}/>
                            </div>
                        </form>
                        <div>
                            <div className="col s12 m12 col-padding-friend-landing">
                                <h6 className="grey-text text-darken-3 title-underline-users">Your added friends</h6>
                            </div>
                        {friends && Object.entries(friends).map((friend) => {
                            return(
                                <Link to={'/profile-preview/' + friend[1].userID} key={friend[0]}>
                                    <FriendItem user={friend[1]}/>
                                </Link>
                            )
                        })}
                        </div>
                        <div className="col s12 m12 col-padding-friend-landing">
                            <h6 className="grey-text text-darken-3 title-underline-users">All users</h6>
                        </div>

                        <div>
                        {users && Object.entries(users).map((user) => {
                            return(
                                <Link to={'/profile-preview/' + user[0]} key={user[0]}>
                                    <FriendItem user={user[1]}/>
                                </Link>
                            )
                        })}
                        </div>

                    </div>
                </div>
            </div></div>
            </div>
        </div>
    )
}

export default FriendLanding;
