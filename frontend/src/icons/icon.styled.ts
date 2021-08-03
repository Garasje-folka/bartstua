import styled, { AnyStyledComponent, css } from "styled-components";

type StyledIconProps = {
  height?: string;
  width?: string;
};

export const generateStyledIcon = (svg: AnyStyledComponent) => styled(
  svg
)<StyledIconProps>`
  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `}
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
`;
