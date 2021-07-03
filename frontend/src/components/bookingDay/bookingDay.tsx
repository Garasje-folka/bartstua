import { BOOKING_ENDING_TIME } from "../../services/bookingManagement/constants";
import { getEventStartingHour } from "../../services/bookingManagement";
import { createDateHourFromDateDay } from "../../services/bookingManagement/helpers/createDateHour";
import parseDateDay from "../../services/bookingManagement/helpers/parseDateDay";
import { BookingRequest, DateDay } from "utils";
import { BookingEvent } from "../bookingEvent";
import { Heading, HeadingTypes } from "../text";

interface bookingDayProps {
  dateDay: DateDay;
  onBooking: (booking: BookingRequest) => void;
}

const BookingDay = (props: bookingDayProps) => {
  const { dateDay, onBooking } = props;

  const getBookingEvents = () => {
    const startHour = getEventStartingHour(dateDay);
    if (!startHour) return [];

    const events = [];
    for (let hour = startHour; hour <= BOOKING_ENDING_TIME; hour++) {
      events.push(
        <BookingEvent
          key={hour}
          dateHour={createDateHourFromDateDay(dateDay, hour)}
          onBooking={onBooking}
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
