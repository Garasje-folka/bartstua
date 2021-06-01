import { Navbar, Nav, Button } from "react-bootstrap";
import { useHistory } from "react-router";

const Header = () => {
  const history = useHistory();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Bartstua</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/"> Hjem </Nav.Link>
        <Nav.Link href="/booking"> Booking </Nav.Link>
        <Nav.Link href="/about"> Om Oss </Nav.Link>
      </Nav>
      <Button onClick={() => history.push("/register")}>Registrer deg</Button>
      <Button onClick={() => history.push("/login")}>Logg inn</Button>
    </Navbar>
  );
};

export default Header;
