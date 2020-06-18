import React, { useContext } from "react";

import NotificationModel from "../notification-interface";
import Notification from "../Notification/Notification";
import { UserContext } from "../../../../contexts/user/UserContext";

const ViewAllNotifications: React.FC = () => {
    const { user } = useContext(UserContext);

    return <div>
        {user.notifications.length > 0
            ? user.notifications.map((notification: NotificationModel) => {
                return <Notification notification={notification} />
            })
            : "All caught up."}
    </div>
};

export default ViewAllNotifications;