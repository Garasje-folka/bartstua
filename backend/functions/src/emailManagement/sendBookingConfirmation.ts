import { sendMail } from "./sendMail";
import { BookingData } from "utils";
import parseDateHour from "../bookingManagment/helpers/parseDateHour";

const sendBookingConfirmation = async (
  email: string,
  bookings: BookingData[]
): Promise<void> => {
  let bookingMessage: string = "";

  for (const booking of bookings) {
    bookingMessage +=
      "<p>Dato: " +
      parseDateHour(booking.date, true, true, true, true) +
      " Plass: " +
      booking.spaces +
      "</p>";
  }

  const message =
    "<h1>Bekreftelses ordre</h1><p>Hei! Takk for din reservasjon. Reservasjonene dine er:</p>" +
    bookingMessage +
    "<p>Med vennlig hilsen</p><p>Bartstua</p>";

  await sendMail(
    "le.william.h@outlook.com",
    email,
    "Reservasjon bekreftelse",
    message,
    message
  );
};

export { sendBookingConfirmation };
