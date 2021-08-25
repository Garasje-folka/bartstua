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
  RegisterButton,
} from "./header.styled";
import { Button } from "../button";
import { useMobileScreen } from "../../hooks/useMobileScreen";
import { DropDownNavigation } from "./dropDownNavigation";
import { NavigationItems } from "./types/navigationItems";
import {
  ABOUT,
  BOOKING,
  HOME,
  SIGNIN,
  REGISTER,
  CART,
} from "../../router/routeConstants";
import { IconType } from "../../icons";
import Logonobg from "../../assets/logo-nobg.png";

const Header = () => {
  const history = useHistory();
  const currentUser = useSelector(currentUserSelector);
  const isMobileScreen = useMobileScreen();

  const handleSignOut = () => {
    userManagement.signOut();
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
    {
      title: "Cart",
      url: CART,
    },
  ];

  const signOutButton: React.ReactNode = (
    <Button onClick={handleSignOut}>Logg ut</Button>
  );

  const signInButton: React.ReactNode = (
    <SignInButton onClick={() => history.push(SIGNIN)}>Logg inn</SignInButton>
  );

  const registerButton: React.ReactNode = (
    <RegisterButton onClick={() => history.push(REGISTER)}>
      Registrer
    </RegisterButton>
  );

  const cartButton: React.ReactNode = (
    <Button icon={IconType.CartIcon} onClick={() => history.push(CART)} />
  );

  return (
    <StyledNavbar bg="light" expand="lg">
      <LeftAlignedContent>
        <Navbar.Brand onClick={() => history.push(HOME)}>
          <img src={Logonobg} height="55"></img>
        </Navbar.Brand>
      </LeftAlignedContent>

      <RightAlignedContent>
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

        {currentUser && currentUser.email ? (
          signOutButton
        ) : (
          <>
            {!isMobileScreen && registerButton}
            {signInButton}
          </>
        )}
      </RightAlignedContent>
    </StyledNavbar>
  );
};
export { Header };
