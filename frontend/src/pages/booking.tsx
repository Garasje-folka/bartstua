import React, { FormEvent, useState } from "react";
import { BookingDay } from "../components/bookingDay/bookingDay";
import { Container, Row, Col } from "react-bootstrap";
import { BookingRequest, DateDay } from "utils";
import createDateDayFromDate from "../services/bookingManagement/helpers/createDateDay";
import { Button } from "../components/button";
import addToDateDay from "../services/bookingManagement/helpers/addToDateDay";
import parseDateDay from "../services/bookingManagement/helpers/parseDateDay";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../redux/selectors";
import {
  addReservation,
  confirmReservationPayment,
} from "../services/bookingManagement";
import { signInAnonymously } from "../services/userManagement/signInAnonymously";
import { Link, useHistory } from "react-router-dom";
import { CART } from "../router/routeConstants";

const Booking: React.FC = () => {
  const currentUser = useSelector(currentUserSelector);
  const history = useHistory();

  const [startDay, setStartDay] = useState<DateDay>(
    createDateDayFromDate(new Date())
  );

  const incrementStartDate = (positive: boolean) => {
    const incrementDay = positive ? 1 : -1;

    setStartDay((prevStartDay) => addToDateDay(prevStartDay, incrementDay));
  };

  const getBookingDates = (columns: number) => {
    const bookingDates = [];
    for (let i = 0; i < columns; i++) {
      const offsetDay = addToDateDay(startDay, i);

      bookingDates.push(
        <Col key={parseDateDay(offsetDay, true, true, true)}>
          <BookingDay dateDay={offsetDay} onBooking={handleBooking} />
        </Col>
      );
    }

    return bookingDates;
  };

  const handleBooking = async (booking: BookingRequest) => {
    try {
      let uid = currentUser?.uid;
      if (!uid) return;
      await addReservation(booking);
    } catch (error) {
      console.log(error);
    }
  };

  return currentUser?.uid ? (
    <div>
      <Button onClick={() => history.push(CART)}>Videre</Button>
      <Button onClick={() => incrementStartDate(false)}> Bakover </Button>
      <Button onClick={() => incrementStartDate(true)}> Forover </Button>
      <Container>
        <Row>{getBookingDates(5)}</Row>
      </Container>
    </div>
  ) : (
    <Button onClick={() => signInAnonymously()}>Logg inn som gjest</Button>
  );
};

export { Booking };
