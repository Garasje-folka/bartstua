import styled from "styled-components";
import { Button } from "../button";
import { Navbar, Nav as BootstrapNav } from "react-bootstrap";

export const StyledNavbar = styled(Navbar)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
`;

const NavbarContent = styled.div`
  margin-left: ${({ theme }) => theme.alignment.margin.REGULAR};
  margin-right: ${({ theme }) => theme.alignment.margin.REGULAR};
  display: flex;
  flex-direction: row;
`;
export const RightAlignedContent = styled(NavbarContent)``;
export const LeftAlignedContent = styled(NavbarContent)`
  flex-grow: 1;
`;

export const SignInButton = styled(Button)`
  margin-left: ${({ theme }) => theme.alignment.margin.REGULAR};
`;

export const Nav = styled(BootstrapNav)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const NavLink = styled(BootstrapNav.Link)`
  margin-left: ${({ theme }) => theme.alignment.margin.REGULAR};
  margin-right: ${({ theme }) => theme.alignment.margin.REGULAR};
`;
