import React, { Fragment } from "react";
import "./Recovery.css";

import { Link } from "react-router-dom";

const Recovery: React.FC = () => {
    return (
        <Fragment>
            <div className="login-support">
                <h2>Can't log in?</h2>
                <p>There are several reasons you might not be able to log in. Check below for more information and possible solution options.</p>
            </div>

            <ul className="account-recovery-options">
                <li className="option-forgot-password">
                    <Link to="/account-recovery/forgotten-password">
                        <span className="recovery-icon"><i className="fas fa-key"></i></span>
                        <span className="option">I don't remember my password</span>
                    </Link>
                </li>
                <li className="option-acc-locked">
                    <Link to="/account-recovery/locked">
                        <span className="recovery-icon"><i className="fas fa-user-slash"></i></span>
                        <span className="option">My Trippy Account is locked</span>
                    </Link>
                </li>
                <li className="option-user-email">
                    <Link to="/account-recovery/forgotten-credentials">
                        <span className="recovery-icon"><i className="fas fa-envelope"></i></span>
                        <span className="option">I don't remember my email or username</span>
                    </Link>
                </li>
            </ul>
        </Fragment>
    );
};

export default Recovery;