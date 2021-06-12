import { Button as BootstrapButton } from "react-bootstrap";
import styled from "styled-components";
import { theme } from "../../theme";

export const StyledButton = styled(BootstrapButton)`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
`;

export const IconWrapper = styled.div`
  margin-left: ${theme.alignment.margin.REGULAR};
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
`;
