import styled from "styled-components";
import { theme } from "../../theme";

export const SessionContainer = styled.div`
  min-width: 150px;
  min-height: 150px;
  width: 10vw;
  height: 10vw;
  margin-bottom: ${theme.alignment.margin.REGULAR};
  margin-top: ${theme.alignment.margin.REGULAR};
  box-shadow: ${theme.shadow.REGULAR};
`;
