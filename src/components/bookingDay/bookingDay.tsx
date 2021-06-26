import { BOOKING_ENDING_TIME } from "../../shared/bookingManagement/constants";
import { getEventStartingHour } from "../../shared/bookingManagement/helpers";
import { createDateHourFromDateDay } from "../../shared/bookingManagement/helpers";
import { parseDateDay } from "../../shared/bookingManagement/helpers/parseDateDay";
import { DateDay } from "../../shared/bookingManagement/types";
import { BookingEvent } from "../bookingEvent";
import { Heading, HeadingTypes } from "../text";

interface bookingDayProps {
  dateDay: DateDay;
}

const BookingDay = (props: bookingDayProps) => {
  const { dateDay } = props;

  const getBookingEvents = () => {
    const startHour = getEventStartingHour(dateDay);
    if (!startHour) return [];

    const events = [];
    for (let hour = startHour; hour <= BOOKING_ENDING_TIME; hour++) {
      events.push(
        <BookingEvent
          key={hour}
          dateHour={createDateHourFromDateDay(dateDay, hour)}
        />
      );
    }

    return events;
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
