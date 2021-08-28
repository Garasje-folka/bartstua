import { useEffect, useState } from "react";
import { Calendar } from "../../components/calendar/calendar";
import {
  CalendarCard,
  CenterContentProvider,
  ContentContainer,
} from "./booking.styled";
import { CardColors, CardSizes, Card } from "../../components/card";
import { SaunaChooser } from "./saunaChooser";
import { EventsChooser } from "./eventsChooser";
import { createDateDayFromDate } from "utils/dist/dates/helpers";
import {
  BookingReservationRequest,
  DropInEvent,
  DropInReservationRequest,
  EventLocation,
} from "utils/dist/bookingManagement/types";
import { Button } from "../../components/button";
import { addDropInReservations } from "../../services/bookingManagement";
import { BookingTypeChooser } from "./bookingTypeChooser";
import { addBookingReservations } from "../../services/bookingManagement/addBookingReservations";

const Booking = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [spaces, setSpaces] = useState<number>(1);
  const [wholeSauna, setWholeSauna] = useState<boolean>(false);
  const [selectedEvents, setSelectedEvents] = useState<DropInEvent[]>([]);

  useEffect(() => {
    setSelectedEvents([]);
  }, [spaces, date]);

  const addToCart = async () => {
    if (wholeSauna) {
      const requests = selectedEvents.map((e) => {
        const reservationRequest = {
          time: e.time,
          location: EventLocation.loation1,
        } as BookingReservationRequest;

        return reservationRequest;
      });

      try {
        await addBookingReservations(requests);
      } catch (error) {
        console.log(error);
      }
    } else {
      const requests = selectedEvents.map((e) => {
        const reservationRequest = {
          time: e.time,
          spaces: spaces,
          location: EventLocation.loation1,
        } as DropInReservationRequest;

        return reservationRequest;
      });

      try {
        await addDropInReservations(requests);
      } catch (error) {
        console.log(error);
      }
    }

    setSelectedEvents([]);
  };

  return (
    <CenterContentProvider>
      <ContentContainer>
        <Card size={CardSizes.BIG} color={CardColors.PRIMARY}>
          <SaunaChooser />
        </Card>
        <CalendarCard size={CardSizes.SMALL}>
          <Calendar date={date} setDate={setDate} minDate={new Date()} />
        </CalendarCard>
        <Card size={CardSizes.SMALL}>
          <EventsChooser
            dateDay={createDateDayFromDate(date)}
            spaces={spaces}
            selectedEvents={selectedEvents}
            setSelectedEvents={setSelectedEvents}
          />
        </Card>
        <Card size={CardSizes.SMALL}>
          <BookingTypeChooser
            setSpaces={setSpaces}
            spaces={spaces}
            setWholeSauna={setWholeSauna}
            wholeSauna={wholeSauna}
          />
        </Card>

        <Button onClick={addToCart} disabled={selectedEvents.length === 0}>
          Legg til i handlekurv
        </Button>
      </ContentContainer>
    </CenterContentProvider>
  );
};

export { Booking };
