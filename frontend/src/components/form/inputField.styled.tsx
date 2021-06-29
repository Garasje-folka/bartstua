import { Form } from "react-bootstrap";
import styled, { css } from "styled-components";
import { InputFieldSize } from "./inputField";

interface ErrorProps {
  serious?: boolean;
}

export const Error = styled.div<ErrorProps>`
  color: ${({ serious, theme }) =>
    serious ? theme.form.colors.ERROR : theme.form.colors.WARNING};
`;

const getMaxWidth = (size: InputFieldSize) => {
  switch (size) {
    case InputFieldSize.SMALL:
      return "250px";
    default:
      // InputFieldSize.REGULAR
      return "400px";
  }
};

interface StyledFormGroupProps {
  $largeSpacing: boolean;
  $size: InputFieldSize;
}

export const StyledFormGroup = styled(Form.Group)<StyledFormGroupProps>`
  margin-bottom: ${({ theme, $largeSpacing }) =>
    $largeSpacing
      ? theme.alignment.margin.LARGE
      : theme.alignment.margin.REGULAR};
  margin-top: ${({ theme, $largeSpacing }) =>
    $largeSpacing
      ? theme.alignment.margin.LARGE
      : theme.alignment.margin.REGULAR};
  max-width: ${({ $size }) => getMaxWidth($size)};
`;

interface StyledFormControlProps {
  $isError: boolean;
  $serious: boolean;
}

export const StyledFormControl = styled(Form.Control)<StyledFormControlProps>`
  border-color: transparent;
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};
  ${({ $isError, $serious, theme }) =>
    $isError &&
    css`
      border-color: ${$serious
        ? theme.form.colors.ERROR
        : theme.form.colors.WARNING};

      &: focus {
        border-color: ${$serious
          ? theme.form.colors.ERROR
          : theme.form.colors.WARNING};
      }
    `};
`;
