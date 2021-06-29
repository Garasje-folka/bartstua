import React, { useState } from "react";
import { BookingDay } from "../components/bookingDay/bookingDay";
import { Container, Row, Col } from "react-bootstrap";
import { DateDay } from "shared/src/types";
import createDateDayFromDate from "../services/bookingManagement/helpers/createDateDay";
import { Button } from "../components/button";
import addToDateDay from "../services/bookingManagement/helpers/addToDateDay";
import parseDateDay from "../services/bookingManagement/helpers/parseDateDay";

const Booking: React.FC = () => {
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
          <BookingDay dateDay={offsetDay} />
        </Col>
      );
    }

    return bookingDates;
  };
  return (
    <>
      <Button onClick={() => incrementStartDate(false)}> Bakover </Button>
      <Button onClick={() => incrementStartDate(true)}> Forover </Button>
      <Container>
        <Row>{getBookingDates(5)}</Row>
      </Container>
    </>
  );
};

export { Booking };
