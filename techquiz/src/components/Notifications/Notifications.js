import React from 'react';
import FriendItem from "../friends/FriendItem";
import {Link} from "react-router-dom";

const Notifications = ({notifications}) => {
    return (
        <div className="card">
            {notifications ? Object.entries(notifications).map((notification) => {
                return (
                    <li key={notification[0]}>
                        <Link to={notification[1].linkTo} key={notification[0]}>
                            Notification from: <i>{notification[1].fromUser}</i> :"{notification[1].notificationMessage}"
                        </Link>
                    </li>
                )
            }) : "You have no notifications. Go do something"}
        </div>
    )
}

export default Notifications;
