import React from "react";
import "./Home.css";

import advertise from "../../static/images/homepage/chat.svg"
import friends from "../../static/images/homepage/friends.svg";
import join from "../../static/images/homepage/join.svg";

const Home: React.FC = () => {
    return (
        <div className="header-background">
            <div className="container subheader">
                <div className="row page-intro">
                    <h1>Travelling made easier</h1>
                    <p>Shared travel taken to the next level. Trippy makes your transportation planning effortless
                    guiding
                    you every step of the way. Join others on their destination or create your own.
                    </p>
                    <a className="anchor underline" href="/sign-up">Sign Up</a>
                </div>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <div className="row">
                            <div className="col align-self-center">
                                <div className="features-title">With Trippy you can travel by</div>
                            </div>
                            <ul className="features">
                                <li><img className="feature-icon" src={join} alt="join available trips" />Joining others</li>
                                <li><img className="feature-icon" src={advertise} alt="advertise your trip" />Advertising your own journey</li>
                                <li><img className="feature-icon" src={friends} alt="cooperate wtih friends" />Everything together with friends</li>
                            </ul>
                            <a className="btn btn-info" href="/">Learn more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;