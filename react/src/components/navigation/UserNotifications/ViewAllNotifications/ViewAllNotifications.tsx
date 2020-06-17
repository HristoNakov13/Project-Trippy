import React, { useContext } from "react";

import Notification from "../notification-interface";
import NotificationAction from "../NotificationAction/NotificationAction";
import { UserContext } from "../../../../contexts/user/UserContext";

const ViewAllNotifications: React.FC = () => {
    const { user } = useContext(UserContext);

    return <div>
        {user.notifications.map((notification: Notification) => {
            return <NotificationAction notification={notification} />
        })}
    </div>
};

export default ViewAllNotifications;