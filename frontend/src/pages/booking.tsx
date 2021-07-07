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
import { addReservation } from "../services/bookingManagement";
import { signInAnonymously } from "../services/userManagement/signInAnonymously";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const Booking: React.FC = () => {
  const currentUser = useSelector(currentUserSelector);
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );

  const stripe = useStripe();
  const elements = useElements();

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
      const secret = await addReservation(booking);
      setClientSecret(secret);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardConfirmation = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
      } else {
        console.log("Payment failed!");
      }
    }
  };

  return currentUser?.uid ? (
    <>
      <form onSubmit={handleCardConfirmation}>
        <CardElement />
        <button disabled={!stripe}> Confirm order </button>
      </form>
      <Button onClick={() => incrementStartDate(false)}> Bakover </Button>
      <Button onClick={() => incrementStartDate(true)}> Forover </Button>
      <Container>
        <Row>{getBookingDates(5)}</Row>
      </Container>
    </>
  ) : (
    <Button onClick={() => signInAnonymously()}>Logg in som gjest</Button>
  );
};

export { Booking };
