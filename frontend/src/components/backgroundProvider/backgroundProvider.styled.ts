import styled, { css } from "styled-components";
import { Background } from "./backgroundProvider";
import { ReactComponent as Wave } from "./assets/waves.svg";

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
      ${currentBackground.shaded
        ? css`
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
            background-blend-mode: lighten, normal, normal;
          `
        : currentBackground.tinted
        ? css`
            background: linear-gradient(
                ${({ theme }) => theme.colorPalette.secondary.default}55,
                ${({ theme }) => theme.colorPalette.secondary.default}55
              ),
              url(${currentBackground.url});
          `
        : css`
            background: url(${currentBackground.url});
          `}
      background-repeat: no-repeat;
      background-size: 100% auto;
    `};
`;

export const ContentWrapper = styled.div`
  position: relative;
`;

export const StyledWave = styled(Wave)`
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: fixed;
  bottom: 0;
`;
