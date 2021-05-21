import "./header.css";
import { useLocation, Link } from "react-router-dom";

interface IPath {
  text: string;
  path: string;
}

const Header = () => {
  const currentPath: string = useLocation().pathname;

  const paths: IPath[] = [
    { text: "Hjem", path: "/" },
    { text: "Booking", path: "/BookingPage" },
    { text: "Om Oss", path: "/AboutUsPage" },
    { text: "Ofte Stilte Spørsmål", path: "/FAQPage" },
  ];

  return (
    <ul>
      <li>
        <h1>Bartstua</h1>
      </li>
      {paths.map(({ text, path }) => (
        <li key={path}>
          <Link to={path} className={currentPath === path ? "active" : ""}>
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Header;
