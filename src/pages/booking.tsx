import React from "react";
import { BookingDate } from "../components/bookingDate/bookingDate";
import { Container, Row, Col } from "react-bootstrap";

const Booking: React.FC = () => {
  const getBookingDates = (startDate: Date) => {
    const bookingDates = [];

    for (let i = 0; i < 5; i++) {
      const offsetDate = new Date();
      offsetDate.setDate(startDate.getDate() + i);
      bookingDates.push(
        <Col>
          <BookingDate key={i} date={offsetDate} />
        </Col>
      );
    }

    return bookingDates;
  };
  return (
    <Container>
      <Row>{getBookingDates(new Date())}</Row>
    </Container>
  );
};

export { Booking };
