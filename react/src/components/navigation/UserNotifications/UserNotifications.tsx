import React, { Fragment } from "react";

import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Notification from "./notification-interface";

interface Props {
    notifications: Array<Notification>,
}

const UserNotifications: React.FC = () => {
    return <Fragment>
        <NavDropdown alignRight title={<i className="fas fa-bell"></i>} id="account-controll-drpdown">
            <NavDropdown.Header>Notifications</NavDropdown.Header>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/user/notifications"><i className="fas fa-book"></i> View all</NavDropdown.Item>
        </NavDropdown>
    </Fragment>
};

export default UserNotifications;