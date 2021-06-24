import styled from "styled-components";
import { themeConfig } from "../../app.theme";

export const SessionContainer = styled.div`
  min-width: 150px;
  min-height: 150px;
  width: 10vw;
  height: 10vw;
  margin-bottom: ${themeConfig.alignment.margin.REGULAR};
  margin-top: ${themeConfig.alignment.margin.REGULAR};
  box-shadow: ${themeConfig.shadow.REGULAR};
`;
