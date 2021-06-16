import { LAST_SESSION_TIME } from "../../services/bookingManagement/constants";
import getBookingStartingHour from "../../services/bookingManagement/helpers/getBookingStartingHour";
import { BookingSession } from "../bookingSession";
import { Heading, HeadingTypes } from "../text";

interface bookingDateProps {
  date: Date;
}

// TODO: Remove duplicate code, almost same as parseDate
const BookingDate = (props: bookingDateProps) => {
  const { date } = props;

  const getFormattedDate = () => {
    return (
      ("0" + date.getDate()).slice(-2) +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      date.getFullYear()
    );
  };

  const getBookingSessions = () => {
    const sessions = [];

    const startHour = getBookingStartingHour(date);

    for (let hour = startHour; hour <= LAST_SESSION_TIME; hour++) {
      const sessionDate = new Date(date);
      sessionDate.setHours(hour);

      sessions.push(<BookingSession key={hour} date={sessionDate} />);
    }

    return sessions;
  };

  return (
    <>
      <Heading type={HeadingTypes.HEADING4}>{getFormattedDate()}</Heading>
      {getBookingSessions()}
    </>
  );
};

export { BookingDate };
