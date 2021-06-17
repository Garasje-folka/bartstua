import React from "react";
import { BookingDay } from "../components/bookingDay/bookingDay";
import { Container, Row, Col } from "react-bootstrap";
import { DateDay } from "../services/bookingManagement/interfaces";
import createDateDayFromDate from "../services/bookingManagement/helpers/createDateDay";

const Booking: React.FC = () => {
  const getBookingDates = (startDay: DateDay, columns: number) => {
    const bookingDates = [];
    for (let i = 0; i < columns; i++) {
      const offsetDay = {
        ...startDay,
        day: startDay.day + i,
      };

      bookingDates.push(
        <Col key={i}>
          <BookingDay dateDay={offsetDay} />
        </Col>
      );
    }

    return bookingDates;
  };
  return (
    <Container>
      <Row>{getBookingDates(createDateDayFromDate(new Date()), 5)}</Row>
    </Container>
  );
};

export { Booking };
