import { Form } from "react-bootstrap";
import styled, { css } from "styled-components";
import { theme } from "../../theme";
import { InputFieldSize } from "./inputField";

export const Error = styled.div`
  color: ${(props: { serious?: boolean }) =>
    props.serious ? theme.form.colors.ERROR : theme.form.colors.WARNING};
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
  margin-bottom: ${theme.alignment.margin.REGULAR};
  margin-top: ${theme.alignment.margin.REGULAR};
  max-width: ${(props: { size: InputFieldSize }) => getMaxWidth(props.size)};
`;

export const StyledFormControl = styled(Form.Control)`
  ${(props: { isError: boolean; serious: boolean }) =>
    props.isError &&
    css`
      border-color: ${props.serious
        ? theme.form.colors.ERROR
        : theme.form.colors.WARNING};

      &: focus {
        border-color: ${props.serious
          ? theme.form.colors.ERROR
          : theme.form.colors.WARNING};
      }
    `}
`;
