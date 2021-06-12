import { Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { currentUserSelector } from "../../redux/selectors";
import { userManagement } from "../../services";
import {
  StyledNavbar,
  RightAlignedContent,
  LeftAlignedContent,
  SignInButton,
  Nav,
  NavLink,
} from "./header.styled";
import { Button } from "../button";
import { useMobileScreen } from "../../hooks/useMobileScreen";
import { DropDownNavigation } from "./dropDownNavigation";
import { NavigationItems } from "./types/navigationItems";
import { SignOutIcon } from "../../icons";
import {
  ABOUT,
  BOOKING,
  HOME,
  SIGNIN,
  REGISTER,
} from "../../router/routeConstants";

const Header = () => {
  const history = useHistory();
  const currentUser = useSelector(currentUserSelector);
  const isMobileScreen = useMobileScreen();

  const handleSignOut = () => {
    userManagement.signOut().then(() => {
      // Quick fix for kicking logged out user out of protected page:
      // Reload page so that requireLogin router guard executes.
      //window.location.reload();
      //const path = history.location.pathname;
      history.push(SIGNIN);
      //history.replace("/hei");
      //history.push(path);
    });
  };

  const items: NavigationItems[] = [
    {
      title: "Hjem",
      url: HOME,
    },
    {
      title: "Booking",
      url: BOOKING,
    },
    {
      title: "Om Oss",
      url: ABOUT,
    },
  ];

  const signOutButton: React.ReactNode = (
    <Button icon={SignOutIcon} onClick={handleSignOut}>
      Sign out
    </Button>
  );

  const signInButton: React.ReactNode = (
    <SignInButton onClick={() => history.push(SIGNIN)}>Sign in</SignInButton>
  );

  const registerButton: React.ReactNode = (
    <Button onClick={() => history.push(REGISTER)}>Register</Button>
  );

  return (
    <StyledNavbar bg="light" expand="lg">
      <LeftAlignedContent>
        <Navbar.Brand onClick={() => history.push(HOME)}>Bartstua</Navbar.Brand>
        {isMobileScreen ? (
          <DropDownNavigation items={items} />
        ) : (
          <Nav className="mr-auto">
            {items.map((item) => (
              <NavLink key={item.url} onClick={() => history.push(item.url)}>
                {item.title}
              </NavLink>
            ))}
          </Nav>
        )}
      </LeftAlignedContent>
      <RightAlignedContent>
        {currentUser ? (
          signOutButton
        ) : (
          <>
            {!isMobileScreen && registerButton}
            {signInButton}
          </>
        )}
      </RightAlignedContent>
      {/* <h1>
          {currentUser?.email} + {currentUser?.emailVerified ? "ja" : "nei"}
        </h1> */}
    </StyledNavbar>
  );
};
export { Header };
