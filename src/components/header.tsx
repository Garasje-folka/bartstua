import { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import firebase, { auth } from "../fireConfig";
import { Context } from "../store";

// TODO: Should probably not check for user in this component, maybe in some higher order component and pass downwards?

const Header = () => {
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(Context);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Bartstua</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/"> Hjem </Nav.Link>
        <Nav.Link href="/booking"> Booking </Nav.Link>
        <Nav.Link href="/about"> Om Oss </Nav.Link>
      </Nav>

      {currentUser && currentUser.emailVerified ? (
        <Button onClick={handleLogout}>Logg ut</Button>
      ) : (
        <>
          <Button onClick={() => history.push("/register")}>
            Registrer deg
          </Button>
          <Button onClick={() => history.push("/login")}>Logg inn</Button>
        </>
      )}
    </Navbar>
  );
};

export default Header;
