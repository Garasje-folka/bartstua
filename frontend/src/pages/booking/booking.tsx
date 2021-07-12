import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDateDayFromDate } from "utils/src/dates/helpers";
import { DatePicker } from "../../components/datePicker";
import { TimePicker } from "../../components/timePicker";
import { CART, HOME } from "../../router/routeConstants";
import { OuterContainer, NextButton, BackButton } from "./booking.styled";

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

  const onNextPressed = () => {
    switch (bookingState) {
      case BookingState.DATE_PICKING:
        setBookingState(BookingState.TIME_PICKING);
        break;
      case BookingState.TIME_PICKING:
        history.push(CART);
        break;
    }
  };

  const onBackPressed = () => {
    switch (bookingState) {
      case BookingState.DATE_PICKING:
        history.push(HOME);
        break;
      case BookingState.TIME_PICKING:
        setBookingState(BookingState.DATE_PICKING);
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
          <TimePicker dateDay={createDateDayFromDate(date)} spaces={spaces} />
        );
    }
  };

  return (
    <OuterContainer>
      {getStateComponent()}
      <BackButton onClick={onBackPressed}> Tilbake </BackButton>
      <NextButton onClick={onNextPressed}> Videre </NextButton>
    </OuterContainer>
  );
};

export { Booking };
