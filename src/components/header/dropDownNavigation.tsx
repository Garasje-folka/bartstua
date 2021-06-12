import { NavDropdown } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { HOME } from "../../router/routeConstants";
import { NavigationItems } from "./types/navigationItems";

interface DropdownNavigationProps {
  items: NavigationItems[];
}

const DropDownNavigation: React.FC<DropdownNavigationProps> = (props) => {
  const { items } = props;
  const history = useHistory();
  const location = useLocation();

  const getCurrentPage = () => {
    const currentPage = items
      .filter((item) => item.url !== HOME)
      .filter((item) => location.pathname.includes(item.url))
      .pop();
    return currentPage ? currentPage.title : "Hjem";
  };
  return (
    <NavDropdown title={getCurrentPage()} id="navbarScrollingDropdown">
      {items.map((item) => (
        <NavDropdown.Item onClick={() => history.push(item.url)}>
          {item.title}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

export { DropDownNavigation };
