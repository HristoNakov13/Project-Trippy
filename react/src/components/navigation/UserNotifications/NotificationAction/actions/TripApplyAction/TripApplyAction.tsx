import React, { Fragment } from "react";

import { Button } from "react-bootstrap";
import TripApplyActionHandle from "./trip-apply-handle-request-interface";
import tripService from "../../../../../../services/trip-service";

interface Props {
    value: string,
    destination: string,
    notificationId: number,
}

const TripApplyAction: React.FC<Props> = ({ value, destination, notificationId }) => {
    const approveHandler = () => {
        tripService.approveApplicant({ applicantId: value, tripId: destination, notificationId } as TripApplyActionHandle)
            .then(res => console.log(res))
            .catch(console.error);
    };

    const denyHandler = () => {

    };

    return <Fragment>
        <Button variant="success" onClick={approveHandler}>Approve</Button>
        <Button variant="danger" onClick={denyHandler}>Deny</Button>
    </Fragment>
};

export default TripApplyAction;