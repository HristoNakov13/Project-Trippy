import React, { Fragment } from "react";

import { Button } from "react-bootstrap";
import TripApplyActionHandle from "./trip-apply-handle-request-interface";
import tripService from "../../../../../../services/trip-service";
import { useHistory } from "react-router-dom";

interface Props {
    value: string,
    destination: string,
    notificationId: number,
}

const TripApplyAction: React.FC<Props> = ({ value, destination, notificationId }) => {
    const history = useHistory();
    const approveHandler = () => {
        tripService.approveApplicant({ applicantId: value, tripId: destination, notificationId, isApproved: true } as TripApplyActionHandle)
            .then(() => {
                history.push("/user/notifications");
            })
            .catch(console.error);
    };

    const denyHandler = () => {
        tripService.denyApplicant({ applicantId: value, tripId: destination, notificationId, isApproved: false } as TripApplyActionHandle)
            .then(() => {
                history.push("/user/notifications");
            })
            .catch(console.error);
    };

    return <Fragment>
        <Button variant="success" onClick={approveHandler}>Approve</Button>
        <Button variant="danger" onClick={denyHandler}>Deny</Button>
    </Fragment>
};

export default TripApplyAction;