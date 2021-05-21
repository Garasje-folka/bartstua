import { Route, Switch } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Home from "../pages/home";

const Header = () => {
return <>
<Navbar bg="light" expand="lg">
<Navbar.Brand href="/">Bartstua</Navbar.Brand>
  <Nav className="mr-auto">
    <Nav.Link href="/"> Hjem </Nav.Link>
    <Nav.Link href="/booking"> Booking </Nav.Link>
    <Nav.Link href="/oss"> Om Oss </Nav.Link>
  </Nav>
</Navbar>
</>
}

export default Header;
