import React  from "react";

const NotificationBell = ({className, ammountOfNotifications}) => {
    return(
        <div className={className}>
            <div id="notification-bell" className="notification-bell-inner-container">
                <svg className="notification-bell" xmlns="http://www.w3.org/2000/svg"  aria-hidden="true"
                     focusable="false" width="1em" height="1em"
                     preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36">
                    <path id="notification-bell-path" className="clr-i-solid clr-i-solid-path-1"
                          d="M32.85 28.13l-.34-.3A14.37 14.37 0 0 1 30 24.9a12.63 12.63 0 0 1-1.35-4.81v-4.94A10.81 10.81 0 0 0 19.21 4.4V3.11a1.33 1.33 0 1 0-2.67 0v1.31a10.81 10.81 0 0 0-9.33 10.73v4.94a12.63 12.63 0 0 1-1.35 4.81a14.4 14.4 0 0 1-2.47 2.93l-.34.3v2.82h29.8z"
                          fill="#FFFF"/>
                    <path className="clr-i-solid clr-i-solid-path-2" d="M15.32 32a2.65 2.65 0 0 0 5.25 0z" fill="#FFFF"/>
                    {ammountOfNotifications ? <circle className="SVGBadge-svgBackground" cx="26" cy="11" r="9"/> : ""}
                    {ammountOfNotifications ? <text className="SVGBadge-number" x="26" y="14.5" textAnchor="middle">{ammountOfNotifications}</text> : ""}

                </svg>
            </div>
        </div>
    )
}

export default NotificationBell;

