import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DateDay, EventData } from "../../../../utils/dist";
import { Heading, HeadingTypes } from "../../components/text";
import { reservationsSelector } from "../../redux/ducks/reservations";
import {
  addReservation,
  getEventStartingHour,
  MAX_EVENT_SPACES,
  subscribeEvents,
} from "../../services/bookingManagement";
import getHourRange from "../../services/bookingManagement/helpers/getHourRange";
import {
  OuterContainer,
  TimeButton,
  TimeContainer,
  TimeText,
} from "./timePicker.styled";

export type TimePickerProps = {
  dateDay: DateDay;
  spaces: number;
};

// TODO: Rename??
type FilteredEvent = EventData & {
  isReserved?: boolean;
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
        if (isReserved(e)) {
          result.push({
            ...e,
            isReserved: true,
          } as FilteredEvent);
        } else if (MAX_EVENT_SPACES - e.spacesTaken >= spaces) {
          result.push(e);
        }
      }
    });

    return result;
  };

  const isReserved = (e: EventData) => {
    for (const res of reservations) {
      if (JSON.stringify(res.date) === JSON.stringify(e.date)) {
        return true;
      }
    }

    return false;
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

  return (
    <OuterContainer>
      <Heading type={HeadingTypes.HEADING4}> Velg time</Heading>
      {getFilteredEvents().map((e) => (
        <TimeContainer key={e.date.hour}>
          <TimeButton onClick={() => reserveEvent(e)} disabled={e.isReserved}>
            {getHourRange(e.date.hour)}
          </TimeButton>
          <TimeText type={HeadingTypes.HEADING4}>
            {`${MAX_EVENT_SPACES - e.spacesTaken}`}
          </TimeText>
        </TimeContainer>
      ))}
    </OuterContainer>
  );
};

export { TimePicker };
