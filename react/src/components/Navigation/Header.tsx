import React, { Fragment, useMemo } from "react";
import "./Header.css";

import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import logo from "../../static/images/test-logo.png";
import LoggedUser from "../auth/LogIn/logged-user-interface";

import authService from "../../services/auth-service";

interface Props {
    isLoggedIn: boolean,
    user: LoggedUser,
}

const Navigation: React.FC<Props> = ({ isLoggedIn, user }) => {
    const history = useHistory();
    const handleLogOut = useMemo(() => (() => {
        authService.loguout()
            .finally(() => {
                history.push("/");
            });
    }), [history]);

    return (
        <Fragment>
            <header className="site-header">
                <Navbar collapseOnSelect expand="lg" className="navbar navbar-dark navbar-expand-md justify-content-center navbar-bg-dark">
                    <Navbar.Brand className="d-flex w-50 mr-auto">
                        <Link to="/" className="navbar-brand">
                            <img className="logo-icon" src={logo} alt="brand-logo" />
                            <span className="brand-name">Trippy</span>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="w-100">
                        <Nav className="navbar-nav w-100 justify-content-center">
                            <NavDropdown title="Trips" id="trips-dropdown">
                                <NavDropdown.Item as={Link} to="/trips/search"><i className="fas fa-search" /> Search</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/trips/create"><i className="fas fa-plus"></i> Create</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/profile/my-trips"><i className="fas fa-history"></i> History</NavDropdown.Item>
                            </NavDropdown>
                            <Link to="/about" className="nav-link">About</Link>
                            <Link to="/about" className="nav-link">About</Link>
                        </Nav>
                        <Nav className="nav navbar-nav ml-auto w-100 justify-content-end">
                            <Link to="/login" className="nav-link auth login">Log In</Link>
                            <Link to="/sign-up" className="nav-link auth sign-up">Sign Up</Link>
                            <NavDropdown alignRight title="MyAccount123" id="account-controll-drpdown">
                                <NavDropdown.Item as={Link} to="/user/trips"><i className="fas fa-map-marked-alt" /> My Trips</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/user/cars"><i className="fas fa-car" /> My Cars</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/user/settings"><i className="fas fa-cog" /> Settings</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} onClick={handleLogOut} to="/logout" ><i className="fas fa-sign-out-alt" /> Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        </Fragment>
    )
};

export default Navigation;