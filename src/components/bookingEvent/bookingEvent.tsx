import { useEffect, useState } from "react";
import { addBooking } from "../../services/bookingManagement";
import { MAX_EVENT_SPACES } from "../../services/bookingManagement/constants";
import { getEvent } from "../../services/bookingManagement/getEvent";
import { Heading, HeadingTypes } from "../text";
import { SessionContainer } from ".";
import { DateHour } from "../../services/bookingManagement/interfaces";

interface BookingEventProps {
  dateHour: DateHour;
}

const BookingEvent = (props: BookingEventProps) => {
  const [spaceLeft, setSpaceLeft] = useState<number | undefined>(undefined);
  const { dateHour } = props;

  // TODO: Should propably create generalized formatting methods or use an existing library instead
  const dateToHourRange = () => {
    const hour = dateHour.hour;

    return (
      ("0" + hour).slice(-2) + ":00 - " + ("0" + (hour + 1)).slice(-2) + ":00"
    );
  };

  const fetchData = () => {
    getEvent(dateHour).then((snapshot) => {
      if (snapshot.exists) {
        const spacesTaken = snapshot.get("spacesTaken");
        setSpaceLeft(MAX_EVENT_SPACES - spacesTaken);
      } else {
        setSpaceLeft(MAX_EVENT_SPACES);
      }
    });
  };

  useEffect(() => {
    fetchData();
  });

  const handleBooking = () => {
    addBooking(dateHour, 1).then(() => {
      fetchData();
    });
  };

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
