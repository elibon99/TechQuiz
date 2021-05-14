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
        <div className="container general-container">
            <div className="row">
                <div className="col s12 m12 l12 xl4">
                    <div className="card general-card">
                        <div className="card-content">
                            <h5 className="profile-info-card-title">Friend Requests</h5>
                            <div className="friend-request-container">
                                <div className="incoming-friend-request-container">
                                    <h6 className="friend-request-title">Incoming friend requests</h6>
                                    <div className="card friend-req-margin">
                                        <div className="card-content">
                                            {friendRequests ? Object.entries(friendRequests).map((request) => {
                                                return(
                                                    <FriendRequestItem key={request[0]} request={request[1]} requestID={request[0]}
                                                                       acceptFriendRequest={acceptFriendRequest}
                                                                       rejectFriendRequest={rejectFriendRequest}/>
                                                )
                                            }): <div>No current friend requests</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="pending-friend-request-container">
                                    <h6 className="friend-request-title">Pending friend requests</h6>
                                    <div className="card friend-req-margin">
                                        <div className="card-content">
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
                    </div>
                </div>
                <div className="col s12 m12 l12 xl8">
                    <div className="card general-card">
                        <div className="card-content">
                            <h5 className="profile-info-card-title">Friends & Users</h5>
                            <form className="white" onChange={(e) => {e.preventDefault();}}>
                                <div className="input-field input-field-padding">
                                    <input type="text" id="userName" name="userName" placeholder="Search for users.." onChange={e => {setUsername(e.target.value)}}/>
                                </div>
                            </form>
                            <h6 className="grey-text text-darken-3 title-underline-users">Your added friends</h6>
                            <div className="friends-container">
                                <div className="row">
                                    {friends ? Object.entries(friends).map((friend) => {
                                        return(
                                            <Link to={'/profile-preview/' + friend[1].userID} key={friend[0]}>
                                                <FriendItem user={friend[1]}/>
                                            </Link>
                                        )
                                    }) : (friends === null) ? <div className="no-friends-title">
                                        You don't have any friends. Go friend someone on their profile!</div> : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>}
                                </div>
                            </div>
                            <h6 className="grey-text text-darken-3 title-underline-users">All users</h6>
                            <div className="friends-container">
                                <div className="row">
                                    {users ? Object.entries(users).map((user) => {
                                        return(
                                            <Link to={'/profile-preview/' + user[0]} key={user[0]}>
                                                <FriendItem user={user[1]}/>
                                            </Link>
                                        )
                                    }): <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default FriendLanding;
