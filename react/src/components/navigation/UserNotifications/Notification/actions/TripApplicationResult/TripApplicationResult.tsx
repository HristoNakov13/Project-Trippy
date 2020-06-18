import React from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
    destination: string,
}

const TripApplicationResult: React.FC<Props> = ({ destination }) => {
    return <div>
        <Button as={Link} to={`/trips/details/${destination}`}>Trip details</Button>
    </div>
};

export default TripApplicationResult;