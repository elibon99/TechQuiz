import React from 'react';
import {NavLink} from "react-router-dom";

const Notifications = ({notifications}) => {
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
                            {notification[1].notificationMessage} from {notification[1].fromUser}
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
