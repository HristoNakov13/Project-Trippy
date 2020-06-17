import React, { useMemo } from "react";
import "./NotificationAction.css";

import { Button, Row, Col, Card } from "react-bootstrap";

import Notification from "../notification-interface";
import hasKey from "../../../../util/has-key";
import TripApplyAction from "./actions/TripApplyAction/TripApplyAction";

interface Props {
    notification: Notification,
}

const actionTitles = {
    TRIP_APPLY: "Trip application",
}

const NotificationAction: React.FC<Props> = ({ notification }) => {
    const actions = useMemo(() => ({
        TRIP_APPLY: <TripApplyAction
            value={notification.value}
            destination={notification.destination}
            notificationId={notification.id} />,
    }), []);

    return <Card className="notification-card">
        <Card.Header as="h5"><span className="text-feature">{hasKey(actionTitles, notification.action) && actionTitles[notification.action]}</span></Card.Header>
        <Card.Body>
            <Card.Title>{notification.title}</Card.Title>
            <Card.Text>
                <div className="actions-container">
                    {hasKey(actions, notification.action) && actions[notification.action]}
                </div>
            </Card.Text>
            <Card.Footer><span className="text-feature">Date:</span> {notification.createdAt}</Card.Footer>
        </Card.Body>
    </Card>
};

export default NotificationAction;