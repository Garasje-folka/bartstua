import styled from "styled-components";
import { Button } from "../button";
import { Navbar, Nav as BootstrapNav } from "react-bootstrap";

export const StyledNavbar = styled(Navbar)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
  background: rgba(255, 255, 255, 0.76);
  position: sticky;
  top: 0;
`;

const NavbarContent = styled.div`
  margin-left: ${({ theme }) => theme.alignment.margin.REGULAR};
  margin-right: ${({ theme }) => theme.alignment.margin.REGULAR};
  display: flex;
  flex-direction: row;
  font-family: Roboto;
  font-style: normal;
  align-items: center;
  text-align: center;
  color: #000000;
`;

export const RightAlignedContent = styled(NavbarContent)``;
export const LeftAlignedContent = styled(NavbarContent)`
  flex-grow: 1;
`;

export const SignInButton = styled(Button)`
  margin-left: ${({ theme }) => theme.alignment.margin.REGULAR};
  background: #296b79;
  box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
`;

export const RegisterButton = styled(Button)`
  margin-left: ${({ theme }) => theme.alignment.margin.REGULAR};
  background: #ffffff;
  box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  color: black;
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
