import { Navbar, Nav, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { currentUserSelector } from "../ducks/currentUser";
import { userManagement } from "../services";

const Header = () => {
  const history = useHistory();
  const currentUser = useSelector(currentUserSelector);

  const handleLogout = () => {
    userManagement.signOut();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand onClick={() => history.push("/")}>Bartstua</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link onClick={() => history.push("/")}> Hjem </Nav.Link>
        <Nav.Link onClick={() => history.push("/booking")}> Booking </Nav.Link>
        <Nav.Link onClick={() => history.push("/about")}> Om Oss </Nav.Link>
      </Nav>

      {currentUser ? (
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
