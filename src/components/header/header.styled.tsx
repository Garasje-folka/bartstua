import styled from "styled-components";
import { theme } from "../../theme";
import { Button } from "../button";
import { Navbar } from "react-bootstrap";

export const StyledNavbar = styled(Navbar)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  box-shadow: ${theme.shadow.REGULAR};
`;

const NavbarContent = styled.div`
  margin-left: ${theme.alignment.margin.REGULAR};
  margin-right: ${theme.alignment.margin.REGULAR};
  display: flex;
  flex-direction: row;
`;
export const RightAlignedContent = styled(NavbarContent)``;
export const LeftAlignedContent = styled(NavbarContent)`
  flex-grow: 1;
`;

export const LoginButton = styled(Button)`
  margin-left: ${theme.alignment.margin.REGULAR};
`;
