import { sendMail } from "./sendMail";
import {
  FullSaunaReservationData,
  DropInReservationData,
} from "utils/dist/bookingManagement/types";
import { dateHourToISO } from "utils/dist/dates/helpers";

const sendBookingConfirmation = async (
  email: string,
  bookings: FullSaunaReservationData[],
  dropIns: DropInReservationData[]
): Promise<void> => {
  let bookingMessage: string = "";

  if (bookings.length !== 0) bookingMessage += "<p> Booking: </p>";
  for (const booking of bookings) {
    bookingMessage +=
      "<p>Tid: " + dateHourToISO(booking.time, true, true, true, true) + "</p>";
  }

  if (dropIns.length !== 0) bookingMessage += "<p> Drop in: </p>";
  for (const dropIn of dropIns) {
    bookingMessage +=
      "<p>Tid: " +
      dateHourToISO(dropIn.time, true, true, true, true) +
      " Plasser: " +
      dropIn.spaces +
      "</p>";
  }

  const message =
    "<h1>Bekreftelses ordre</h1><p>Hei! Takk for din bestilling. Timene dine er:</p>" +
    bookingMessage +
    "<p>Med vennlig hilsen</p><p>Bartstua</p>";

  // TODO: Use bartstua noreply email
  await sendMail(
    "le.william.h@outlook.com",
    email,
    "Reservasjon bekreftelse",
    message,
    message
  );
};

export { sendBookingConfirmation };
