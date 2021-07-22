import styled from "styled-components";
import { Theme } from "../../app.theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${({ theme }: { theme: Theme }) => theme.colorPalette.primary.default};
`;

export const Header = styled.span`
  font-size: ${({ theme }: { theme: Theme }) => theme.text.size.CARD_HEADER};
`;

export const CounterNumber = styled.div`
  font-size: 6rem;
`;

export const PlusMinusContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }: { theme: Theme }) => theme.alignment.margin.LARGE};
`;

export const AllPlaces = styled.div`
  font-size: ${({ theme }: { theme: Theme }) =>
    theme.text.size.CARD_HIGHLIGHTED};
`;
