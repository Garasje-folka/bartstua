import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Bartstua</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/"> Hjem </Nav.Link>
          <Nav.Link href="/booking"> Booking </Nav.Link>
          <Nav.Link href="/about"> Om Oss </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
