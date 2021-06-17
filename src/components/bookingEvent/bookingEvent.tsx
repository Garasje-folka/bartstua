import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../redux/selectors";
import { addBooking } from "../../services/bookingManagement";
import { MAX_EVENT_PARTICIPANTS } from "../../services/bookingManagement/constants";
import { getBookingEvent } from "../../services/bookingManagement/getBookingEvent";
import { Heading, HeadingTypes } from "../text";
import { SessionContainer } from ".";
import { DateHour } from "../../services/bookingManagement/interfaces";

interface BookingEventProps {
  dateHour: DateHour;
}

const BookingEvent = (props: BookingEventProps) => {
  const user = useSelector(currentUserSelector);
  const [spaceLeft, setSpaceLeft] = useState<number | undefined>(undefined);
  const [userHasSession, setUserHasSession] = useState<boolean | undefined>(
    undefined
  );
  const { dateHour } = props;

  // TODO: Should propably create generalized formatting methods or use an existing library instead
  const dateToHourRange = () => {
    const hour = dateHour.hour;

    return (
      ("0" + hour).slice(-2) + ":00 - " + ("0" + (hour + 1)).slice(-2) + ":00"
    );
  };

  const fetchData = () => {
    getBookingEvent(dateHour).then((snapshot) => {
      if (snapshot.exists) {
        const participants = snapshot.get("participants");
        setSpaceLeft(MAX_EVENT_PARTICIPANTS - participants.length);
        setUserHasSession(participants.includes(user?.uid));
      } else {
        setSpaceLeft(MAX_EVENT_PARTICIPANTS);
        setUserHasSession(false);
      }
    });
  };

  useEffect(() => {
    fetchData();
  });

  const handleBooking = () => {
    if (userHasSession) return;
    addBooking(dateHour).then(() => {
      fetchData();
    });
  };

  return (
    <>
      {spaceLeft && userHasSession !== undefined && (
        <SessionContainer onClick={handleBooking}>
          <Heading type={HeadingTypes.HEADING4}>{dateToHourRange()}</Heading>
          {"Ledige plasser: " + spaceLeft} {"Du har booket: " + userHasSession}
        </SessionContainer>
      )}
    </>
  );
};

export { BookingEvent };
