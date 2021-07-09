import { useEffect, useState } from "react";
import { MAX_EVENT_SPACES } from "../../services/bookingManagement/constants";
import { subscribeEvent } from "../../services/bookingManagement";
import { Heading, HeadingTypes } from "../text";
import { SessionContainer } from ".";
import { BookingRequest, DateHour, EventData } from "utils";
import getHourRange from "../../services/bookingManagement/helpers/getHourRange";

interface BookingEventProps {
  dateHour: DateHour;
  onBooking: (booking: BookingRequest) => void;
}

const BookingEvent = (props: BookingEventProps) => {
  const [spaceLeft, setSpaceLeft] = useState<number | undefined>(undefined);
  const { dateHour, onBooking } = props;

  const handleEventUpdate = (event: EventData | undefined) => {
    if (event) {
      setSpaceLeft(MAX_EVENT_SPACES - event.spacesTaken);
    } else {
      setSpaceLeft(MAX_EVENT_SPACES);
    }
  };

  const handleBooking = () => {
    onBooking({
      date: dateHour,
      spaces: 1,
    });
  };

  useEffect(() => {
    const unsubscribe = subscribeEvent(dateHour, (event) =>
      handleEventUpdate(event)
    );

    return () => {
      unsubscribe();
    };
  }, [dateHour]);

  return (
    <>
      {spaceLeft !== undefined && (
        <SessionContainer onClick={handleBooking}>
          <Heading type={HeadingTypes.HEADING4}>
            {getHourRange(dateHour.hour)}
          </Heading>
          {"Ledige plasser: " + spaceLeft}
        </SessionContainer>
      )}
    </>
  );
};

export { BookingEvent };
