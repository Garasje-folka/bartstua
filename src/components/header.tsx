import { Navbar, Nav, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import useGlobalState from "../hooks/useGlobalState";
import { userManagement } from "../services";

const Header = () => {
  const history = useHistory();
  const { currentUser } = useGlobalState();

  const handleLogout = () => {
    userManagement.signOut();
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
      <h1>
        {currentUser?.email} + {currentUser?.emailVerified ? "ja" : "nei"}
      </h1>
    </Navbar>
  );
};

export default Header;
