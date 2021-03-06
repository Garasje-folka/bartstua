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
  CartButton,
  SignOutButton,
  Logo,
} from "./header.styled";
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
  CHECKOUT,
} from "../../router/routeConstants";
import { IconType } from "../../icons";
import Logonobg from "../../assets/logo-nobg.png";
import { useState } from "react";
import { useEffect } from "react";

const Header = () => {
  const history = useHistory();
  const currentUser = useSelector(currentUserSelector);
  const isMobileScreen = useMobileScreen();

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) setHasScrolled(true);
      else setHasScrolled(false);
    });
  }, []);

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
      title: "Betaling",
      url: CHECKOUT,
    },
  ];

  const signOutButton: React.ReactNode = (
    <SignOutButton onClick={handleSignOut}>Logg ut</SignOutButton>
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
    <CartButton icon={IconType.CartIcon} onClick={() => history.push(CART)} />
  );

  return (
    <StyledNavbar expand="lg" hasScrolled={hasScrolled}>
      <LeftAlignedContent>
        <Navbar.Brand onClick={() => history.push(HOME)}>
          <Logo src={Logonobg} height="55" alt="Logo" />
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
          <>
            {cartButton}
            {signOutButton}
          </>
        ) : (
          <>
            {cartButton}
            {!isMobileScreen && registerButton}
            {signInButton}
          </>
        )}
      </RightAlignedContent>
    </StyledNavbar>
  );
};
export { Header };
