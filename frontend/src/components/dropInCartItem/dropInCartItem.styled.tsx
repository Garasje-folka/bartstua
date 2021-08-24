import styled from "styled-components";
import { Theme } from "../../app.theme";

export const VeriticalAlignedTextContainer = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

export const BackgroundReservation = styled.div`
  background-color: #296b79;
  border-radius: ${({ theme }) => theme.radius.ROUND};
  margin: 20px;
  padding: 1px;
`;
