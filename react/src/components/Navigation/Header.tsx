import React, { Fragment, useMemo, useContext } from "react";
import "./Header.css";

import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import logo from "../../static/images/test-logo.png";
import LoggedUser from "../auth/LogIn/logged-user-interface";

import { UserContext } from "../../contexts/user/UserContext";

interface Props {
    isLoggedIn: boolean,
    user: LoggedUser,
}

const Navigation: React.FC<Props> = ({ isLoggedIn, user }) => {
    const { logout } = useContext(UserContext);
    const history = useHistory();

    const handleLogOut = useMemo(() => (() => {
        logout()
            .finally(() => {
                history.push("/");
            });
    }), [history, logout]);

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
                                <NavDropdown.Item as={Link} to="/user/trips/search"><i className="fas fa-search" /> Search</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/user/trips/create"><i className="fas fa-plus"></i> Create</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/profile/my-trips"><i className="fas fa-history"></i> History</NavDropdown.Item>
                            </NavDropdown>
                            <Link to="/about" className="nav-link">About</Link>
                            <Link to="/contacts" className="nav-link">Contacts</Link>
                        </Nav>
                        <Nav className="nav navbar-nav ml-auto w-100 justify-content-end">
                            {isLoggedIn
                                ? (<Fragment><NavDropdown alignRight title={user && user.username} id="account-controll-drpdown">
                                    <NavDropdown.Item as={Link} to="/user/trips"><i className="fas fa-map-marked-alt" /> My Trips</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/user/cars"><i className="fas fa-car" /> My Cars</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/user/profile"><i className="fas fa-cog" /> Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} onClick={handleLogOut} to="/logout"><i className="fas fa-sign-out-alt" /> Logout</NavDropdown.Item>
                                </NavDropdown></Fragment>)
                                : (<Fragment><Link to="/login" className="nav-link auth login">Log In</Link>
                                    <Link to="/sign-up" className="nav-link auth sign-up">Sign Up</Link></Fragment>)
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        </Fragment>
    )
};

export default Navigation;