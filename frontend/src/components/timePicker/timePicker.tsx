import { useEffect, useState } from "react";
import { DateDay, EventData } from "../../../../utils/dist";
import { Heading, HeadingTypes } from "../../components/text";
import {
  addReservation,
  MAX_EVENT_SPACES,
  subscribeEvents,
} from "../../services/bookingManagement";
import getHourRange from "../../services/bookingManagement/helpers/getHourRange";
import { Button } from "../button";
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

const TimePicker = (props: TimePickerProps) => {
  const { dateDay, spaces } = props;
  const [events, setEvents] = useState<EventData[]>([]);

  const handleEventsUpdate = (newEvents: EventData[]) => {
    setEvents(newEvents);
  };

  useEffect(() => {
    const unsubscribe = subscribeEvents(dateDay, spaces, (newEvents) =>
      handleEventsUpdate(newEvents)
    );

    return () => {
      unsubscribe();
    };
  }, [dateDay]);

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
      {events.map((e) => (
        <TimeContainer key={e.date.hour}>
          <TimeButton onClick={() => reserveEvent(e)}>
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
