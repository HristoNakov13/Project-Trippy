import React, { Fragment } from "react";
import "./Navigation.css";

import { NavDropdown, NavDropdownProps, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../static/images/brand-logo.svg";

const Navigation: React.FC = () => {
    return (
        <Fragment>
            <header className="site-header">
                <Navbar collapseOnSelect expand="lg" className="navbar navbar-dark navbar-expand-md justify-content-center navbar-bg-dark">
                    <Navbar.Brand className="d-flex w-50 mr-auto">
                        <Link to="/" className="navbar-brand">
                            <img className="logo-icon" src={logo} />
                            <span className="brand-name">Trippy</span>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="w-100">
                        <Nav className="navbar-nav w-100 justify-content-center">
                            <NavDropdown title="Trips" id="trips-dropdown">
                                <NavDropdown.Item as={Link} to="/asd">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            <Link to="/about" className="nav-link">About</Link>
                            <Link to="/about" className="nav-link">About</Link>
                        </Nav>
                        <Nav className="nav navbar-nav ml-auto w-100 justify-content-end">
                            <Link to="/" className="nav-link auth login">Log In</Link>
                            <Link to="/sign-up" className="nav-link auth sign-up">Sign Up</Link>
                            <NavDropdown alignRight title="MyAccount123" id="account-controll-drpdown">
                                <NavDropdown.Item as={Link} to="/">lkjkj</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        </Fragment>
    )
};

export default Navigation;