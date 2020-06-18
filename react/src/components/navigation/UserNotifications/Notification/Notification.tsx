import React, { useMemo } from "react";
import "./Notification.css";

import { Card } from "react-bootstrap";

import NotificationModel from "../notification-interface";
import hasKey from "../../../../util/has-key";
import TripApplyAction from "./actions/TripApplyAction/TripApplyAction";
import TripApplicationResult from "./actions/TripApplicationResult/TripApplicationResult";

interface Props {
    notification: NotificationModel,
}

const actionTitles = {
    TRIP_APPLY: "Trip application",
    TRIP_APPLICATION_RESULT: "Trip application result"
}

const Notification: React.FC<Props> = ({ notification }) => {
    const actions = useMemo(() => ({
        TRIP_APPLY: <TripApplyAction
            value={notification.value}
            destination={notification.destination}
            notificationId={notification.id} />,

        TRIP_APPLICATION_RESULT: <TripApplicationResult
            destination={notification.destination} />
    }), [notification.destination, notification.id, notification.value]);

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

export default Notification;