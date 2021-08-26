import styled, { css, keyframes } from "styled-components";
import { Icon } from "../../icons";

type BookingTypeChooserWrapperProps = {
  isDropIn: boolean;
  startDropInAnimation: boolean;
};

export const animationTimeMs = 200;

const slideUp = keyframes`
  from {
    transform: translate(0, 30px);
    opacity: 0;
  }
  to {
    transform: translate(0, 0);
    opacity: 1;
  }
`;

export const BookingTypeChooserWrapper = styled.div<BookingTypeChooserWrapperProps>`
  --transition-style: all ease-in-out ${animationTimeMs}ms;

  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.REGULAR};
  transition: var(--transition-style);
  position: relative;

  ${({ isDropIn }) =>
    isDropIn &&
    css`
      grid-template-columns: 1fr 1fr;

      /* grid-template-columns: repeat(2, 70px); */
    `}

  ::after {
    content: "";
    background-color: ${({ theme }) => theme.colorPalette.blended.default};
    transition: var(--transition-style);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    pointer-events: none;
    opacity: 0;
    ${({ startDropInAnimation, isDropIn }) =>
      startDropInAnimation !== isDropIn &&
      css`
        opacity: 1;
      `};
  }
`;

type TextWrapperProps = {
  highlighted: boolean;
};

export const TextWrapper = styled.div<TextWrapperProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  transition: var(--transition-style);
  opacity: 1;

  ${({ highlighted }) =>
    highlighted &&
    css`
      transform: translate(3px, 0);
    `}
`;

type OptionWrapperProps = {
  highlighted: boolean;
};

export const OptionWrapper = styled.div<OptionWrapperProps>`
  --highlighted-border-color: ${({ theme }) =>
    theme.colorPalette.primary.default};

  border-color: ${({ theme }) => theme.colorPalette.contrasted.light};
  border-width: 2px;
  border-style: solid;
  padding: ${({ theme }) => theme.spacing.REGULAR};
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.radius.SLIGHTLY_ROUND};
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.REGULAR};
  align-items: center;
  justify-content: center;
  transition: var(--transition-style);

  ${({ highlighted }) =>
    highlighted &&
    css`
      border-color: var(--highlighted-border-color);
    `}

  :hover {
    border-color: var(--highlighted-border-color);

    cursor: pointer;
    ${TextWrapper} {
      transform: translate(3px, 0);
    }
  }
`;

export const OptionIcon = styled(Icon)`
  color: ${({ theme }) => theme.colorPalette.primary.default};
  min-width: 20px;
  max-width: 20px;
`;

export const TextHeader = styled.div`
  font-weight: ${({ theme }) => theme.text.weight.REGULAR};
`;

type TextDescriptionProps = {
  isDropIn: boolean;
};

export const TextDescription = styled.div<TextDescriptionProps>`
  font-size: 0.8em;
  font-weight: ${({ theme }) => theme.text.weight.THIN};
  color: ${({ theme }) => theme.text.color.PRIMARY_LIGHT};

  ${({ isDropIn }) =>
    isDropIn &&
    css`
      display: none;
    `}
`;

type DividerProps = {
  isDropIn: boolean;
};

export const Divider = styled.div<DividerProps>`
  background-color: ${({ theme }) => theme.colorPalette.contrasted.light};
  min-width: 1px;
  width: 1px;
  min-height: 40px;
  ${({ isDropIn }) =>
    isDropIn &&
    css`
      display: none;
    `}
`;

export const Price = styled.div<DividerProps>`
  min-width: 50px;
  max-width: 50px;
  color: ${({ theme }) => theme.colorPalette.primary.default};
  font-weight: ${({ theme }) => theme.text.weight.REGULAR};
  ${({ isDropIn }) =>
    isDropIn &&
    css`
      display: none;
    `}
`;

export const CounterWrapper = styled.div`
  display: flex;
  justify-content: center;
  animation-name: ${slideUp};
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0, 0, 0.2, 1.24);
`;
