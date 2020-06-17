import Notification from "../../navigation/UserNotifications/notification-interface";

interface LoggedUser {
    id: string,
    username: string,
    notifications: Array<Notification>,
}

export default LoggedUser;