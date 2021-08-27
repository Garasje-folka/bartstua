import styled from "styled-components";
import { Theme } from "../../app.theme";

type StyledButtonProps = {
  selected: boolean;
};
export const TimeContainer = styled.div`
  flex-grow: 1;
  font-weight: ${({ theme }: { theme: Theme }) => theme.text.weight.REGULAR};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PlacesContainer = styled.div`
  font-weight: ${({ theme }) => theme.text.weight.THIN};
  text-align: end;
`;

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ theme, selected }) =>
    selected
      ? theme.colorPalette.secondary.default
      : theme.colorPalette.primary.light};
  border: none;
  color: ${({ theme, selected }) =>
    selected ? theme.text.color.INVERTED : theme.colorPalette.primary.default};
  border-radius: ${({ theme }) => theme.radius.ROUND};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 1.2em;
  min-width: 160px;
  transition-duration: var(--transition-duration);
  transition-timing-function: ease-in-out;
  height: 50px;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme, selected }) =>
    selected ? "rgba(0, 0, 0, 0)" : theme.colorPalette.primary.default};

  --transition-duration: 0.1s;
  ${PlacesContainer}, ${TimeContainer} {
    transition: var(--transition-duration);
  }
  /* :hover {
    ${PlacesContainer}, ${TimeContainer} {
      transform: scale(1.02);
    }
    border-color: ${({ theme }) => theme.colorPalette.secondary.default};
    color: ${({ theme, selected }) =>
    selected
      ? theme.text.color.INVERTED
      : theme.colorPalette.secondary.default};
  } */
`;
