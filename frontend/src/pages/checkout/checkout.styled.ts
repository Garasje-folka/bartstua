import styled from "styled-components";
import { Card } from "../../components/card";

export const StyledCard = styled(Card)`
  display: grid;
  grid-template-columns: 500px 1fr;
  overflow: hidden;
  padding: 0;
`;

export const LeftContainer = styled.div`
  background-color: ${({ theme }) =>
    "#ffffff" + theme.card.BACKGROUND_OPACITY_SUFIX};
  box-shadow: ${({ theme }) => theme.shadow.REGULAR};

  display: flex;
  flex-direction: column;

  gap: 20px;
  padding: 30px;
  box-sizing: border-box;
`;
