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
import { DropDownNavigation } from "./dropDownNavigation";
import { NavigationItems } from "./types/navigationItems";

const Header = () => {
  const history = useHistory();
  const currentUser = useSelector(currentUserSelector);
  const isMobileScreen = useMobileScreen();

  const handleLogout = () => {
    userManagement.signOut();
  };

  const items: NavigationItems[] = [
    {
      title: "Hjem",
      url: "/",
    },
    {
      title: "Booking",
      url: "/booking",
    },
    {
      title: "Om Oss",
      url: "/about",
    },
  ];

  return (
    <StyledNavbar bg="light" expand="lg">
      <LeftAlignedContent>
        <Navbar.Brand onClick={() => history.push("/")}>Bartstua</Navbar.Brand>
        {isMobileScreen ? (
          <DropDownNavigation items={items} />
        ) : (
          <Nav className="mr-auto">
            {items.map((item) => (
              <Nav.Link onClick={() => history.push(item.url)}>
                {item.title}
              </Nav.Link>
            ))}
          </Nav>
        )}
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
