import styled from "styled-components";
import { Theme } from "../../app.theme";

export const SpacesCounterWrapper = styled.div``;

export const ActionArea = styled.div`
  --transition-style: all ease-in-out 200ms;

  align-items: center;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }: { theme: Theme }) => theme.alignment.margin.LARGE};

  border-style: solid;
  border-radius: ${({ theme }) => theme.radius.SLIGHTLY_ROUND};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colorPalette.contrasted.light};
  margin: 20px;
`;

export const Header = styled.span`
  font-size: ${({ theme }: { theme: Theme }) => theme.text.size.CARD_HEADER};
  font-weight: ${({ theme }: { theme: Theme }) => theme.text.weight.REGULAR};
  margin: 20px;
`;

export const CounterNumber = styled.div`
  font-size: 4rem;
  user-select: none;
`;

export const PlusMinusContainer = styled.div``;

export const AllPlaces = styled.div`
  font-size: ${({ theme }: { theme: Theme }) =>
    theme.text.size.CARD_HIGHLIGHTED};
`;

type StyledButtonWrapperProps = {
  disabled: boolean;
};

export const StyledButtonWrapper = styled.div<StyledButtonWrapperProps>`
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.SLIGHTLY_ROUND};
  transition: var(--transition-style);
  background: ${({ theme }) => theme.colorPalette.blended.dark};

  :hover {
    background: ${({ theme }) => theme.colorPalette.contrasted.light};
  }

  &[disabled] {
    color: ${({ theme }) => theme.colorPalette.contrasted.light};
    cursor: default;
    :hover {
      background: ${({ theme }) => theme.colorPalette.blended.dark};
    }
  }
`;
