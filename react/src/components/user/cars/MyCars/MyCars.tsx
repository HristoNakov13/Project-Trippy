import React from "react";

import { Link } from "react-router-dom";

const MyCars: React.FC = () => {
    return <div>
        <Link to="/user/create-car">create car</Link>
    </div>
};

export default MyCars;