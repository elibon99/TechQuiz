import React from 'react';
import {NavLink} from "react-router-dom";
import moment from "moment";
import ThumbsUp from "../friends/ThumbsUp";
import ThumbsDown from "../friends/ThumbsDown";

const Notifications = ({notifications, acceptGameInvitation, rejectGameInvitation, acceptFriendRequest, rejectFriendRequest}) => {
    notifications ? console.log(notifications, "notifications") : console.log("no notifications");

    return (
        <div id="nots" className="notification-dropdown z-depth-3">
            {/*{notifications ? Object.entries(notifications).map((notification) => {*/}
            {/*    return (*/}
            {/*        <li key={notification[0]}>*/}
            {/*            <Link to={notification[1].linkTo} key={notification[0]}>*/}
            {/*                Notification from: <i>{notification[1].fromUser}</i> :"{notification[1].notificationMessage}"*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*    )*/}
            {/*}) : "nope"}*/}
            <div className="dropdown-header">
                <h6>Notifications</h6>
            </div>
            {notifications ? Object.entries(notifications).map((notification) => {
                return(
                    <li id="nots-item" key={notification[0]} className="notification-item">
                        <NavLink to={notification[1].linkTo}>
                            <div className="notification-item-container">
                                <div className="notification-item-logo">{ notification[1].fromUserPhotoURL ?
                                    <img className="notification-user-pic" src={notification[1].fromUserPhotoURL}
                                         alt="notification-logo"/> :
                                    <i className="large material-icons">account_circle</i>
                                }
                                </div>
                                <div className="notification-info">
                                    <div className='notification-title-request-container'>
                                        <h6 className="notification-title">
                                            {notification[1].notificationType === "incomingFriendRequest" ? "Friend Request" : notification[1].notificationType === "acceptedFriendRequest" ?
                                            "Accepted friend request" : notification[1].notificationType === "incomingGameInvitation" ? "Game Invitation" : notification[1].notificationType === "acceptedGameInvitation" ?
                                            "Accepted game invitation" : notification[1].notificationType === "gameSwitchYourTurn" ? "Your turn": (notification[1].notificationType === "gameOverYouWon" || notification[1].notificationType === "gameOverYouLost" || notification[1].notificationType === "gameOverTie") ? "Game Over" :"hej"}
                                        </h6>
                                        {notification[1].notificationType === "incomingFriendRequest" || notification[1].notificationType === "incomingGameInvitation" ?
                                            <div className="thumbs-container">
                                                <ThumbsUp className="thumbs-up" acceptAction={notification[1].notificationType === "incomingFriendRequest" ? acceptFriendRequest : notification[1].notificationType === "incomingGameInvitation" ? acceptGameInvitation : ""} />
                                                <ThumbsDown className="thumbs-down" rejectAction={notification[1].notificationType === "incomingFriendRequest" ? acceptFriendRequest : notification[1].notificationType === "incomingGameInvitation" ? acceptGameInvitation : ""}/>
                                            </div> : ""}

                                    </div>
                                    <h6 className="notification-date">{moment(notification[1].createdAt.toDate()).fromNow()}</h6>
                                    <h6 className="notification-message"> {notification[1].notificationMessage} from {notification[1].fromUser}</h6>
                                </div>
                            </div>
                        </NavLink>
                    </li>
                )
            }): <h5>No current notification</h5>}


       {/*         <a href="!#" className="notification-item">
                    <li to={'/profile'}>
                        Notification from elias
                    </li>
                </a>
                <a href="!#" className="notification-item">
                    <li to={'/profile'}>
                        Notification from elias
                    </li>
                </a>
                <a href="!#" className="notification-item">
                    <li to={'/profile'}>
                        Notification from elias
                    </li>
                </a>*/}


        </div>
    )
}

export default Notifications;
