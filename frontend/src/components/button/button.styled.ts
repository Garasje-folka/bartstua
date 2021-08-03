import { Button as BootstrapButton } from "react-bootstrap";
import styled, { css } from "styled-components";
import { Theme } from "../../app.theme";
import { ButtonStyle } from "./button";

type ButtonStyleProps = {
  buttonStyle: string;
};
export const StyledButton = styled(BootstrapButton)<ButtonStyleProps>`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.alignment.margin.REGULAR};
  margin-top: ${({ theme }) => theme.alignment.margin.REGULAR};

  ${({ buttonStyle }) => {
    switch (buttonStyle) {
      case ButtonStyle.TRANSPARENT: {
        return css`
          background: none;
          border: none;
          color: inherit;
        `;
      }
      case ButtonStyle.REGULAR:
      default: {
        break;
      }
    }
  }}
`;

type IconWrapperProps = {
  hasLabel: boolean;
};

export const IconWrapper = styled.div<IconWrapperProps>`
  ${({ hasLabel }) =>
    hasLabel &&
    css`
      margin-left: ${({ theme }: { theme: Theme }) =>
        theme.alignment.margin.REGULAR};
    `}
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  margin-right: 10px;
`;
