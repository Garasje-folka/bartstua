import { useState } from "react";
import { useHistory } from "react-router-dom";
import { DatePicker } from "../../components/datePicker";
import { TimePicker } from "../../components/timePicker";
import { CART } from "../../router/routeConstants";
import { MAX_EVENT_SPACES } from "../../services/bookingManagement/constants";
import createDateDayFromDate from "../../services/bookingManagement/helpers/createDateDay";
import { OuterContainer, CenteredButton } from "./booking.styled";

enum BookingState {
  DATE_PICKING,
  TIME_PICKING,
}

const Booking = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [spaces, setSpaces] = useState<number>(1);
  const [bookingState, setBookingState] = useState<BookingState>(
    BookingState.DATE_PICKING
  );

  const history = useHistory();

  const onNextPressed = async () => {
    switch (bookingState) {
      case BookingState.DATE_PICKING:
        setBookingState(BookingState.TIME_PICKING);

        break;
      case BookingState.TIME_PICKING:
        history.push(CART);
        break;
    }
  };

  const getStateComponent = () => {
    switch (bookingState) {
      case BookingState.DATE_PICKING:
        return (
          <DatePicker
            date={date}
            setDate={setDate}
            spaces={spaces}
            setSpaces={setSpaces}
          />
        );
      case BookingState.TIME_PICKING:
        return (
          <TimePicker
            dateDay={createDateDayFromDate(date)}
            minSpaces={spaces}
          />
        );
    }
  };

  return (
    <OuterContainer>
      {getStateComponent()}
      <CenteredButton onClick={onNextPressed}> Videre </CenteredButton>
    </OuterContainer>
  );
};

export { Booking };
