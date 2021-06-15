import styled from "styled-components";
import { theme } from "../../theme";

export const InnerContainer = styled.div`
  max-width: ${theme.page.width};
  min-height: ${theme.page.minHeight};
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  flex-grow: 1;
  border-radius: ${theme.radius.ROUND};
  box-shadow: ${theme.shadow.REGULAR};
`;

export const OuterContainer = styled.div`
  display: flex;
`;
