import { useEffect, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { auth } from "../fireConfig";
import firebase from "firebase";

// TODO: Should probably not check for user in this component, maybe in some higher order component and pass downwards?

const Header = () => {
  const history = useHistory();
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

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

      {user && user.emailVerified ? (
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
