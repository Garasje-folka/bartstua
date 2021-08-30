import styled from "styled-components";
import { Theme } from "../../app.theme";
import { Card } from "../../components/card";

export const CenterContentProvider = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  flex-grow: 1;
  margin-top: 100px;
  flex-direction: row;
  display: flex;
  gap: ${({ theme }: { theme: Theme }) => theme.alignment.margin.LARGE};
  flex-wrap: wrap;
`;

export const CalendarCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
