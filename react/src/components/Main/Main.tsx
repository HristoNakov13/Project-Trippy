import React from "react";
import Container from "react-bootstrap/Container";

const Main: React.FC = ({ children }) => {
    return <Container>{children}</Container>;
}

export default Main;