import { useEffect } from "react";
import { DateDay, EventData } from "../../../../utils/dist";
import { Heading, HeadingTypes } from "../../components/text";
import { subscribeEvents } from "../../services/bookingManagement";
import { OuterContainer } from "./timePicker.styled";

export type TimePickerProps = {
  dateDay: DateDay;
  minSpaces: number;
};

const TimePicker = (props: TimePickerProps) => {
  const { dateDay, minSpaces } = props;

  const handleEventsUpdate = (events: EventData[]) => {
    console.log(events);
  };

  useEffect(() => {
    const unsubscribe = subscribeEvents(dateDay, minSpaces, (events) =>
      handleEventsUpdate(events)
    );

    return () => {
      unsubscribe();
    };
  }, [dateDay]);

  return (
    <OuterContainer>
      <Heading type={HeadingTypes.HEADING4}> Velg time</Heading>
    </OuterContainer>
  );
};

export { TimePicker };
