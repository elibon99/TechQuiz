import React from 'react';
import {Redirect} from 'react-router-dom';
import FriendItem from "./FriendItem";
import FriendRequestItem from "./FriendRequestItem";
import SentFriendRequestItem from "./SentFriendRequestItem";
import {Link} from "react-router-dom";

const FriendLanding = ({auth, friends, setUsername, setUsernameUser, friendRequests, sentFriendRequests, acceptFriendRequest, rejectFriendRequest, users}) => {
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
                            <h5 className="profile-info-card-title">FRIEND REQUESTS</h5>
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
                                            }): <div className="no-friend-request-data-text">No current friend requests</div>}
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
                                                }): <div className="no-friend-request-data-text">You have no pending friend requests</div>}
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
                            <h5 className="profile-info-card-title">FRIENDS & USERS</h5>
                            <div className="friend-search-container">
                                <h6 className="grey-text text-darken-3 title-underline-users">Friends</h6>
                                <form className="user-search-form" onChange={(e) => {e.preventDefault();}}>
                                    <input type="text" placeholder="Search for friends.." name="search" onChange={e => {setUsername(e.target.value)}}/>
                                </form>
                            </div>

                            <div className="friends-container">
                                <div className="row">
                                    {friends ? Object.entries(friends).map((friend) => {
                                        if(friend[1] !== null) {
                                            return (
                                                <Link to={'/profile-preview/' + friend[1].userID} key={friend[0]}>
                                                    <FriendItem user={friend[1]}/>
                                                </Link>
                                            )
                                        }
                                    }) : (friends === null) ? <div className="no-friends-title">
                                        Either you don't have any friends or the username you are searching for is not your friend!</div> : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>}
                                </div>
                            </div>
                            <div className="friend-search-container">
                                <h6 className="grey-text text-darken-3 title-underline-users">All users</h6>
                                <form className="user-search-form" onChange={(e) => {e.preventDefault();}}>
                                    <input type="text" placeholder="Search for users.." name="search" onChange={e => {setUsernameUser(e.target.value)}}/>
                                </form>
                            </div>
                            <div className="friends-container-all-users">
                                <div className="row">
                                    {users ? Object.entries(users).map((user) => {
                                        return(
                                            <Link to={'/profile-preview/' + user[0]} key={user[0]}>
                                                <FriendItem user={user[1]}/>
                                            </Link>
                                        )
                                    }):  (users === null)  ? <div className="no-friends-title">
                                        Couldn't find the user you are searching for!</div> : <img src={"http://www.csc.kth.se/~cristi/loading.gif"} alt={"waiting for data"}/>}
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
