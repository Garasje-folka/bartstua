import styled, { css } from "styled-components";
import { Icon } from "../../icons";

export const BookingTypeChooserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.REGULAR};
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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

  ${({ highlighted }) =>
    highlighted &&
    css`
      border-color: var(--highlighted-border-color);
    `}

  ${TextWrapper} {
    transition: all ease-in-out 200ms;
  }
  transition: all ease-in-out 200ms;

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

export const TextDescription = styled.div`
  font-size: 0.8em;
  font-weight: ${({ theme }) => theme.text.weight.THIN};
  color: ${({ theme }) => theme.text.color.PRIMARY_LIGHT};
`;

export const Divider = styled.div`
  background-color: ${({ theme }) => theme.colorPalette.contrasted.light};
  min-width: 1px;
  width: 1px;
  min-height: 40px;
`;

export const Price = styled.div`
  min-width: 50px;
  max-width: 50px;
  color: ${({ theme }) => theme.colorPalette.primary.default};
  font-weight: ${({ theme }) => theme.text.weight.REGULAR};
`;
