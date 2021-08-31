import styled, { css } from "styled-components";
import { Button } from "../button";
import { Navbar, Nav as BootstrapNav } from "react-bootstrap";

export const SignInButton = styled(Button)`
  margin-left: ${({ theme }) => theme.alignment.margin.REGULAR};
  background: ${({ theme }) => theme.colorPalette.primary.default};
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
  border-radius: 100px;
  border: none;
  transition: 200ms;
  :hover {
    background: ${({ theme }) => theme.colorPalette.secondary.default};
    color: ${({ theme }) => theme.colorPalette.blended.default};
  }
  :focus {
    background: ${({ theme }) => theme.colorPalette.secondary.default};
    color: white;
  }
  :active {
    box-shadow: none !important;
  }
`;

export const RegisterButton = styled(Button)`
  margin-left: ${({ theme }) => theme.alignment.margin.REGULAR};
  background: #ffffff;
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
  border-radius: 100px;
  color: black;
  border: none;
  transition: 200ms;
  :hover {
    background: ${({ theme }) => theme.colorPalette.secondary.default};
    color: white;
  }
  :focus {
    background: ${({ theme }) => theme.colorPalette.secondary.default};
    color: white;
  }
`;
export const NavLink = styled(BootstrapNav.Link)`
  margin-left: ${({ theme }) => theme.alignment.margin.REGULAR};
  margin-right: ${({ theme }) => theme.alignment.margin.REGULAR};
`;

export const Logo = styled.img``;

type StyledNavbarProps = {
  hasScrolled: boolean;
};

export const StyledNavbar = styled(Navbar)<StyledNavbarProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;

  background: rgba(0, 0, 0, 0);
  position: sticky;
  top: 0;
  z-index: 1000;
  height: ${({ theme }) => theme.page.headerHeight};
  transition: 200ms;

  ${({ hasScrolled }) =>
    hasScrolled
      ? css`
          box-shadow: ${({ theme }) => theme.shadow.REGULAR};
          background: rgba(255, 255, 255, 0.97);
          background: ${({ theme }) => theme.colorPalette.secondary.light};

          ${SignInButton} {
            box-shadow: none;
          }
          ${RegisterButton} {
            box-shadow: none;
          }
        `
      : css`
          /* ${Logo} {
            filter: brightness(100);
            opacity: 0.9;
          }

          ${NavLink} {
            color: white;
          } */
        `};
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

export const CartButton = styled(Button)`
  background: rgba(255, 255, 255, 0.76);
  color: black;
  border: none;
  margin-right: 10px;

  :hover {
    background: rgba(255, 255, 255, 0.76);
    color: ${({ theme }) => theme.colorPalette.secondary.default};
  }
  :focus {
    background: rgba(255, 255, 255, 0.76);
    color: black;
    border: none;
  }
`;

export const SignOutButton = styled(Button)`
  background: ${({ theme }) => theme.colorPalette.primary.default};
  box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.25);
  border-radius: 100px;

  :hover {
    background: ${({ theme }) => theme.colorPalette.secondary.default};
    color: white;
  }
  :focus {
    background: ${({ theme }) => theme.colorPalette.primary.default};
  }
  border: none;
`;

export const Nav = styled(BootstrapNav)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;
