import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Heading, HeadingTypes } from "../../components/text";
import { reservationsSelector } from "../../redux/ducks/reservations";
import {
  addReservation,
  getEventStartingHour,
  subscribeEvents,
} from "../../services/bookingManagement";
import { MAX_EVENT_SPACES } from "utils/src/bookingManagement/constants";
import {
  OuterContainer,
  TimeButton,
  TimeContainer,
  TimeText,
} from "./timePicker.styled";
import { getHourRange, isEqualDates } from "utils/src/dates/helpers";
import { DateDay } from "utils/src/dates/types";
import { EventData } from "utils/dist";

export type TimePickerProps = {
  dateDay: DateDay;
  spaces: number;
};

// TODO: Rename??
type FilteredEvent = EventData & {
  spacesReserved?: number;
};

const TimePicker = (props: TimePickerProps) => {
  const { dateDay, spaces } = props;
  const [events, setEvents] = useState<EventData[]>([]);
  const reservations = useSelector(reservationsSelector);

  const handleEventsUpdate = (newEvents: EventData[]) => {
    setEvents(newEvents);
  };

  useEffect(() => {
    const unsubscribe = subscribeEvents(dateDay, (newEvents) =>
      handleEventsUpdate(newEvents)
    );

    return () => {
      unsubscribe();
    };
  }, [dateDay]);

  // TODO: Rerender every hour to remove outdated events somehow... (haryp2309)
  const getFilteredEvents = () => {
    const startingHour = getEventStartingHour(dateDay);
    if (!startingHour) return [];

    const result: FilteredEvent[] = [];
    events.forEach((e) => {
      if (e.date.hour >= startingHour) {
        const matchingReservation = getMatchingReservation(e);
        if (matchingReservation) {
          result.push({
            ...e,
            spacesReserved: matchingReservation.data.spaces,
          } as FilteredEvent);
        } else if (MAX_EVENT_SPACES - e.spacesTaken >= spaces) {
          result.push(e);
        }
      }
    });

    return result;
  };

  const getMatchingReservation = (e: EventData) => {
    for (const res of reservations) {
      if (isEqualDates(res.data.date, e.date)) {
        return res;
      }
    }

    return null;
  };

  const reserveEvent = async (selected: EventData) => {
    try {
      await addReservation({
        date: selected.date,
        spaces: spaces,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTimeText = (e: FilteredEvent) => {
    let result = "";

    const spacesLeft = MAX_EVENT_SPACES - e.spacesTaken;
    result += `Ledige plasser: ${spacesLeft}.`;

    if (e.spacesReserved) {
      result += ` Du har reservert ${e.spacesReserved} plass(er)`;
    }

    return result;
  };

  return (
    <OuterContainer>
      <Heading type={HeadingTypes.HEADING4}> Velg time</Heading>
      {getFilteredEvents().map((e) => (
        <TimeContainer key={e.date.hour}>
          <TimeButton onClick={() => reserveEvent(e)}>
            {`${getHourRange(e.date.hour)}`}
          </TimeButton>
          <TimeText type={HeadingTypes.HEADING4}>{getTimeText(e)}</TimeText>
        </TimeContainer>
      ))}
    </OuterContainer>
  );
};

export { TimePicker };
