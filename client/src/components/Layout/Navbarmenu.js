import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {AuthContext} from '../../contexts/index'
import { useContext } from "react";


const Navbarmenu = () => {
  const {authState: {
    user : {username}
  },
  logoutUser
  } = useContext(AuthContext)
  return (
   <>
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand className="font-weight-bolder text-white">
      <Nav.Link className="font-weight-bolder text-white  " disabled>
          Welcome {username}
      </Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/dashboard"
            as={Link}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>
        <Nav>
          <Button className="font-weight-bolder text-white btn" onClick={logoutUser}>
           Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
   </>
  );
};

export default Navbarmenu;
