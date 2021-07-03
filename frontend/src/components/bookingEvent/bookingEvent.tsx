import { useEffect, useState } from "react";
import { addReservation } from "../../services/bookingManagement";
import { MAX_EVENT_SPACES } from "../../services/bookingManagement/constants";
import { subscribeEvent } from "../../services/bookingManagement";
import { Heading, HeadingTypes } from "../text";
import { SessionContainer } from ".";
import { BookingRequest, DateHour, EventData } from "utils";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../redux/selectors";
import { signInAnonymously } from "../../services/userManagement/signInAnonymously";

interface BookingEventProps {
  dateHour: DateHour;
  onBooking: (booking: BookingRequest) => void;
}

const BookingEvent = (props: BookingEventProps) => {
  const currentUser = useSelector(currentUserSelector);
  const [spaceLeft, setSpaceLeft] = useState<number | undefined>(undefined);
  const { dateHour, onBooking } = props;

  // TODO: Should propably create generalized formatting methods or use an existing library instead
  const dateToHourRange = () => {
    const hour = dateHour.hour;

    return (
      ("0" + hour).slice(-2) + ":00 - " + ("0" + (hour + 1)).slice(-2) + ":00"
    );
  };

  const handleEventUpdate = (
    event: EventData | undefined,
    hourInDay: number
  ) => {
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
      handleEventUpdate(event, dateHour.hour)
    );

    return () => {
      unsubscribe();
    };
  }, [dateHour]);

  return (
    <>
      {spaceLeft !== undefined && (
        <SessionContainer onClick={handleBooking}>
          <Heading type={HeadingTypes.HEADING4}>{dateToHourRange()}</Heading>
          {"Ledige plasser: " + spaceLeft}
        </SessionContainer>
      )}
    </>
  );
};

export { BookingEvent };
