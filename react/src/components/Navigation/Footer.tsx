import React from "react";
import "./Footer.css";

import { Link } from "react-router-dom";

import instagram from "../../static/images/social/instagram.svg";
import facebook from "../../static/images/social/facebook.svg";
import twitter from "../../static/images/social/twitter.svg";

import { socialLinks } from "../../shared/constants/constants";

const Footer: React.FC = () => {
    return (
        <footer className="site-footer">
            <div className="site-links">
                <Link className="anchor footer-link" to="/careers">
                    Careers
                </Link>
                <Link className="anchor footer-link" to="/about">
                    About
                </Link>
                <Link className="anchor footer-link" to="/contacts">
                    Contact us
                </Link>
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