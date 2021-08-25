import Calendar from "react-calendar";
import styled, { css } from "styled-components";
import { Theme } from "../../app.theme";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

export const DateLabel = styled.span`
  font-size: ${({ theme }: { theme: Theme }) =>
    theme.text.size.CARD_HIGHLIGHTED};
`;

const removeExistingStyle = css`
  background: none;
  border: none;
  text-decoration: none;
`;

const navigationContainer = css`
  display: flex;
  justify-content: center;
  padding-bottom: ${({ theme }: { theme: Theme }) =>
    theme.alignment.padding.REGULAR};
`;

const navigationButtonStyle = css`
  ${removeExistingStyle}
  display: flex;

  svg {
    margin: auto;
  }
`;

const rightButtonStyle = css`
  ${navigationButtonStyle}
`;

const leftButtonStyle = css`
  ${navigationButtonStyle}
`;

const topLabelStyle = css`
  ${removeExistingStyle}
  max-width: 230px;
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.text.weight.REGULAR};
`;

const topBar = css`
  font-size: ${({ theme }: { theme: Theme }) => theme.text.size.CARD_HEADER};
`;

const previousMonthDayStyle = css`
  opacity: 0.6;
`;

const dayStyle = css`
  ${removeExistingStyle}
  height: 45px;
  margin-top: 7px;
  margin-bottom: 7px;
  text-align: center;
  border-radius: 15px;
  font-weight: ${({ theme }) => theme.text.weight.THIN};
`;

const weekDay = css`
  ${removeExistingStyle}
  text-align: center;

  abbr {
    ${removeExistingStyle}
    text-transform: capitalize;
  }
`;

const calendarStyle = css``;

const arrows = css`
  font-size: 1.6em;
  font-weight: bold;
`;

export const StyledCalendar = styled(Calendar)`
  ${calendarStyle}

  /* Hide year-skipping button */
  .react-calendar__navigation__prev2-button {
    display: none;
  }
  .react-calendar__navigation__next2-button {
    display: none;
  }

  .react-calendar__navigation__label {
    ${topLabelStyle}
  }

  .react-calendar__navigation__prev-button {
    ${leftButtonStyle}
  }

  .react-calendar__navigation__next-button {
    ${rightButtonStyle}
  }

  .react-calendar__month-view__days__day {
    ${dayStyle}
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    ${previousMonthDayStyle}
  }

  .react-calendar__navigation {
    ${navigationContainer}
  }

  .react-calendar__month-view__weekdays__weekday {
    ${weekDay}
  }

  .react-calendar__navigation__arrow {
    ${arrows}
  }

  .react-calendar__navigation {
    ${topBar}
  }

  /* Temporary */
  .react-calendar__tile--active {
    background: #006edc;
    color: white;
  }
`;
