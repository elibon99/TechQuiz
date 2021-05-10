import React from 'react';

const Notifications = ({notifications}) => {
    return (
        <div id="nots" className="notification-dropdown">
            {/*{notifications ? Object.entries(notifications).map((notification) => {*/}
            {/*    return (*/}
            {/*        <li key={notification[0]}>*/}
            {/*            <Link to={notification[1].linkTo} key={notification[0]}>*/}
            {/*                Notification from: <i>{notification[1].fromUser}</i> :"{notification[1].notificationMessage}"*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*    )*/}
            {/*}) : "nope"}*/}
                <a href="!#" className="notification-item">
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
                </a>

        </div>
    )
}

export default Notifications;
