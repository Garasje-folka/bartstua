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

export const StyledFormGroup = styled(Form.Group)`
  margin-bottom: ${({ theme }) => theme.alignment.margin.REGULAR};
  margin-top: ${({ theme }) => theme.alignment.margin.REGULAR};
  max-width: ${(props: { size: InputFieldSize }) => getMaxWidth(props.size)};
`;

interface StyledFormControlProps {
  $isError: boolean;
  $serious: boolean;
}

export const StyledFormControl = styled(Form.Control)<StyledFormControlProps>`
  ${({ $isError, $serious, theme }) =>
    $isError &&
    css`
      border-color: ${$serious
        ? theme.form.colors.ERROR
        : theme.form.colors.WARNING};
    `}
`;
