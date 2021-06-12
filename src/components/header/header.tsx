import { Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { currentUserSelector } from "../../redux/selectors";
import { userManagement } from "../../services";
import {
  StyledNavbar,
  RightAlignedContent,
  LeftAlignedContent,
  LoginButton,
} from "./header.styled";
import { Button } from "../button";
import { useMobileScreen } from "../../hooks/useMobileScreen";

const Header = () => {
  const history = useHistory();
  const currentUser = useSelector(currentUserSelector);
  const isMobileScreen = useMobileScreen();

  const handleLogout = () => {
    userManagement.signOut();
  };

  return (
    <StyledNavbar bg="light" expand="lg">
      <LeftAlignedContent>
        <Navbar.Brand onClick={() => history.push("/")}>Bartstua</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => history.push("/")}> Hjem </Nav.Link>
          <Nav.Link onClick={() => history.push("/booking")}>Booking</Nav.Link>
          <Nav.Link onClick={() => history.push("/about")}> Om Oss </Nav.Link>
        </Nav>
      </LeftAlignedContent>
      <RightAlignedContent>
        {!isMobileScreen &&
          (currentUser ? (
            <Button onClick={handleLogout}>Logg ut</Button>
          ) : (
            <>
              <Button onClick={() => history.push("/register")}>
                Registrer deg
              </Button>
              <LoginButton onClick={() => history.push("/login")}>
                Logg inn
              </LoginButton>
            </>
          ))}
      </RightAlignedContent>
      {/* <h1>
          {currentUser?.email} + {currentUser?.emailVerified ? "ja" : "nei"}
        </h1> */}
    </StyledNavbar>
  );
};
export { Header };
