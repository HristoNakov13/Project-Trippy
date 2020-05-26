import React from "react";

interface Props {
    item: string
}

const NotFound: React.FC<Props> = ({ item }) => {
    return <div>{item} not found 404</div>
};

export default NotFound;