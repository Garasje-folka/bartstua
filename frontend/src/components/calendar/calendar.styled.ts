import styled, { css } from "styled-components";

export const OuterCalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 380px;
`;
export const CalendarWrapper = styled.div`
  --day-wrapper-size: 40px;

  display: grid;
  grid-template-columns: repeat(7, var(--day-wrapper-size));
  gap: ${({ theme }) => theme.spacing.REGULAR};
  justify-content: center;
`;

type DayNumberProps = {
  thisMonth: boolean;
  isSelectedDate: boolean;
  disabled: boolean;
};

export const DayNumber = styled.span<DayNumberProps>`
  color: ${({ theme, isSelectedDate, disabled }) =>
    disabled
      ? theme.text.color.DISABLED
      : isSelectedDate
      ? theme.text.color.INVERTED
      : theme.colorPalette.primary.default};
  font-weight: ${({ theme }) => theme.text.weight.REGULAR};
  transition: 50ms;
  user-select: none;
`;

type DayWrapperProps = {
  thisMonth: boolean;
  isSelectedDate: boolean;
  disabled: boolean;
};

export const DayWrapper = styled.div<DayWrapperProps>`
  height: var(--day-wrapper-size);
  width: var(--day-wrapper-size);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.SLIGHTLY_ROUND};
  transition: 50ms;
  background-color: ${({ theme, isSelectedDate, disabled }) =>
    disabled
      ? "rgba(0,0,0,0)"
      : isSelectedDate
      ? theme.colorPalette.secondary.default
      : theme.colorPalette.primary.light};

  opacity: ${({ thisMonth, disabled }) =>
    disabled ? 0.5 : thisMonth ? 1 : 0.8};

  ${({ disabled }) =>
    !disabled &&
    css`
      :hover {
        cursor: pointer;
        opacity: 1;

        ${DayNumber} {
          transform: scale(1.2);
        }
      }
    `};
`;

export const TopBar = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  align-self: center;
  justify-content: center;
`;

export const MonthAndYear = styled.div`
  flex-grow: 1;
  display: flex;
  align-self: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.text.weight.REGULAR};
  gap: 10px;
  font-size: 1.1em;
`;

export const IconWrapper = styled.div`
  // Alignment
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 5px;

  // Button styling
  border-radius: ${({ theme }) => theme.radius.SLIGHTLY_ROUND};
  transition: 50ms;
  :hover {
    background-color: ${({ theme }) => theme.colorPalette.contrasted.light};
    cursor: pointer;
  }
`;

export const MonthName = styled.span``;

export const YearName = styled.span`
  opacity: 0.3;
`;

export const DayName = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.text.size.GENERIC_SMALL};
  font-weight: ${({ theme }) => theme.text.weight.REGULAR};
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.colorPalette.primary.default};
  opacity: 0.4;
`;
