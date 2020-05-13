import React from "react";
import "./Footer.css";

import { Link } from "react-router-dom";
import {Row, Col} from "react-bootstrap";

import logo from "../../static/images/test-logo.png";
import instagram from "../../static/images/social/instagram.svg";
import facebook from "../../static/images/social/facebook.svg";
import twitter from "../../static/images/social/twitter.svg";

import { socialLinks } from "../../shared/constants/constants";

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="site-links">
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <div className="footer-link">
                            <Link className="anchor" to="/careers">
                                Careers
                            </Link>
                        </div>
                    </Col>
                    <Col md="auto">
                        <div className="footer-link">
                            <Link className="anchor" to="/about">
                                About
                            </Link>
                        </div>
                    </Col>
                    <Col md="auto">
                        <div className="footer-link">
                            <Link className="anchor" to="/contacts">
                                Contact us
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="footer-legal">
                <div className="copyright">
                    <span>&copy;2020 Trippy, Inc. All rights reserved.</span>
                </div>
                <div className="trademark">
                    <span>All trademarks referenced herein are the properties of their respective owners.</span>
                </div>
            </div>
            <div className="footer-social">
                <a href={socialLinks.instagram}>
                    <img className="social-icon" src={instagram} alt="instagram logo" />
                </a>
                <a href={socialLinks.facebook}>
                    <img className="social-icon" src={facebook} alt="facebook logo" />
                </a>
                <a href={socialLinks.twitter}>
                    <img className="social-icon" src={twitter} alt="twitter logo" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;