import { useState } from "react";
import Calendar from "react-calendar";

// Move this to .styled file?
import "react-calendar/dist/Calendar.css";
import { useHistory } from "react-router-dom";
import { InputField } from "../../components/form";
import { LeftAlignedContent } from "../../components/header/header.styled";
import { Heading, HeadingTypes } from "../../components/text";
import { CART } from "../../router/routeConstants";
import { MAX_EVENT_SPACES } from "../../services/bookingManagement/constants";
import {
  DatePickerContainer,
  OuterContainer,
  CenteredButton,
} from "./booking.styled";

enum BookingState {
  DATE_PICKING,
  TIME_PICKING,
}

// TODO: Probably split into date picking and time picking components

const Booking = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [spaces, setSpaces] = useState<number>(1);
  const [bookingState, setBookingState] = useState<BookingState>(
    BookingState.DATE_PICKING
  );

  const history = useHistory();

  const onSpacesChanged = (newSpaces: number) => {
    if (newSpaces <= 0 || newSpaces > MAX_EVENT_SPACES) return;

    setSpaces(newSpaces);
  };

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

  const getTitle = (): string => {
    switch (bookingState) {
      case BookingState.DATE_PICKING:
        return "Velg dato";
      case BookingState.TIME_PICKING:
        return "Velg time";
    }
  };

  return (
    <OuterContainer>
      <Heading type={HeadingTypes.HEADING4}> {getTitle()}</Heading>
      {bookingState === BookingState.DATE_PICKING && (
        <>
          <DatePickerContainer>
            <LeftAlignedContent>
              <InputField
                label="Hvor mange plasser?"
                type="number"
                value={spaces}
                onChange={(event) =>
                  onSpacesChanged(parseInt(event.target.value))
                }
              />
            </LeftAlignedContent>
            <Calendar
              onChange={setDate}
              value={date}
              locale="no-NO"
              minDate={new Date()}
            />
          </DatePickerContainer>
        </>
      )}
      {bookingState === BookingState.TIME_PICKING && <> </>}
      <CenteredButton onClick={onNextPressed}> Videre </CenteredButton>
    </OuterContainer>
  );
};

export { Booking };
