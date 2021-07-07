import { Button as BootstrapButton } from "react-bootstrap";
import styled from "styled-components";

export const StyledButton = styled(BootstrapButton)`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.alignment.margin.REGULAR};
  margin-top: ${({ theme }) => theme.alignment.margin.REGULAR};
`;

export const IconWrapper = styled.div`
  margin-left: ${({ theme }) => theme.alignment.margin.SMALL};
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  margin-right: 10px;
`;
