import { LAST_EVENT_TIME } from "../../services/bookingManagement/constants";
import { getBookingEventStartingHour } from "../../services/bookingManagement";
import { createDateHourFromDateDay } from "../../services/bookingManagement/helpers/createDateHour";
import parseDateDay from "../../services/bookingManagement/helpers/parseDateDay";
import { DateDay } from "../../services/bookingManagement/interfaces";
import { BookingEvent } from "../bookingEvent";
import { Heading, HeadingTypes } from "../text";

interface bookingDayProps {
  dateDay: DateDay;
}

// TODO: Remove duplicate code, almost same as parseDate
const BookingDay = (props: bookingDayProps) => {
  const { dateDay } = props;

  const getBookingEvents = () => {
    const startHour = getBookingEventStartingHour(dateDay);
    if (!startHour) return [];

    const sessions = [];
    for (let hour = startHour; hour <= LAST_EVENT_TIME; hour++) {
      sessions.push(
        <BookingEvent
          key={hour}
          dateHour={createDateHourFromDateDay(dateDay, hour)}
        />
      );
    }

    return sessions;
  };

  return (
    <>
      <Heading type={HeadingTypes.HEADING4}>
        {parseDateDay(dateDay, true, true, true)}
      </Heading>
      {getBookingEvents()}
    </>
  );
};

export { BookingDay };
