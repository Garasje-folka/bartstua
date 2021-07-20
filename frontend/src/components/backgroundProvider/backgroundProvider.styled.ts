import styled, { css } from "styled-components";
import { Background } from "./backgroundProvider";

type StyledContainerProps = {
  currentBackground: Background;
};

export const StyleContainer = styled.div<StyledContainerProps>`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ currentBackground }) => currentBackground.color};
  ${({ currentBackground }) =>
    currentBackground.url &&
    css`
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 1) 49%,
          rgba(0, 0, 0, 1) 90%,
          rgba(0, 0, 0, 1) 100%
        ),
        linear-gradient(
          ${({ theme }) => theme.colorPalette.primary.default}10 0%,
          ${({ theme }) => theme.colorPalette.primary.default}10 100%
        ),
        url(${currentBackground.url});
      background-repeat: no-repeat;
      background-size: 100% auto;
      background-blend-mode: lighten, normal, normal;
    `};
`;
