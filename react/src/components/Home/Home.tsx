import React from "react";
import "./Home.css";

import advertise from "../../static/images/homepage/chat.svg"
import friends from "../../static/images/homepage/friends.svg";
import join from "../../static/images/homepage/join.svg";

import { Row, Col } from "react-bootstrap";

const Home: React.FC = () => {
    return (
        <div className="header-background">
            <div className="container subheader">
                <div className="guest-content">
                    <div className="row page-intro">
                        <h1>Travelling made easier</h1>
                        <p>Shared travel taken to the next level. Trippy makes your transportation planning effortless
                        guiding
                        you every step of the way. Join others on their destination or create your own.
                    </p>
                    </div>
                    <Row className="justify-content-md-center">
                        <div className="features-title">With Trippy you can travel by</div>
                        <Col md="auto">
                            <ul className="features">
                                <li><img className="feature-icon" src={join} alt="join available trips" />Joining others</li>
                                <li><img className="feature-icon" src={advertise} alt="advertise your trip" />Advertising your own journey</li>
                                <li><img className="feature-icon" src={friends} alt="cooperate wtih friends" />Everything together with friends</li>
                            </ul>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <a className="anchor sign-up" href="/sign-up">Sign Up</a>
                        </Col>
                        <Col md="auto">
                            <a className="anchor learn-more" href="/">Learn more</a>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default Home;



