import React from 'react';
import {NavLink} from "react-router-dom";
import moment from "moment";
import NotificationSenderImg from "./NotificationSenderImg";

const Notifications = ({notifications, acceptGameInvitation, rejectGameInvitation, acceptFriendRequest, rejectFriendRequest}) => {
    notifications ? console.log(notifications, "notifications") : console.log("no notifications");

    return (
        <div id="nots" className="notification-dropdown z-depth-3">
            <div className="dropdown-header">
                <h6>Notifications</h6>
            </div>
            {notifications ? Object.entries(notifications).map((notification) => {
                return(
                    <li id="nots-item" key={notification[0]} className="notification-item">
                        <NavLink to={notification[1].linkTo}>
                            <div className="notification-item-container">
                                <div className="notification-item-logo">
                                    {notification[1].fromUserPhotoURL ? <img className="notification-user-pic" src={notification[1].fromUserPhotoURL} alt="notification-logo"/> :
                                    <NotificationSenderImg className="notification-sender-img"/>}

                                </div>
                                <div className="notification-info">
                                    <div className='notification-title-request-container'>
                                        <h6 className="notification-title">
                                            {notification[1].notificationType === "incomingFriendRequest" ? "Friend Request" : notification[1].notificationType === "acceptedFriendRequest" ?
                                            "Accepted friend request" : notification[1].notificationType === "incomingGameInvitation" ? "Game Invitation" : notification[1].notificationType === "acceptedGameInvitation" ?
                                            "Accepted game invitation" : ""}
                                        </h6>
                                    </div>
                                    <h6 className="notification-date">{moment(notification[1].createdAt.toDate()).fromNow()}</h6>
                                    <h6 className="notification-message"> {notification[1].notificationMessage} from {notification[1].fromUser}</h6>
                                </div>
                            </div>
                        </NavLink>
                    </li>
                )
            }): <h5>No current notification</h5>}
        </div>
    )
}

export default Notifications;
