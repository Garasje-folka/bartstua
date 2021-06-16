import React from "react";
import { BookingDate } from "../components/bookingDate/bookingDate";

const Booking: React.FC = () => {
  return <BookingDate date={new Date()}></BookingDate>;
};

export { Booking };
