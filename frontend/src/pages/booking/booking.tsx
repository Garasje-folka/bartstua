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
  FullSaunaReservationRequest,
  DropInEvent,
  DropInReservationRequest,
} from "utils/dist/bookingManagement/types";
import { Button } from "../../components/button";
import { addDropInReservations } from "../../services/bookingManagement";
import { BookingTypeChooser } from "./bookingTypeChooser";
import { addFullSaunaReservations } from "../../services/bookingManagement/addFullSaunaReservations";

const Booking = () => {
  const [saunaId, setSaunaId] = useState<string>(""); // TODO: Maybe initalize as undefined?
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
          saunaId: saunaId,
        } as FullSaunaReservationRequest;

        return reservationRequest;
      });

      try {
        await addFullSaunaReservations(requests);
      } catch (error) {
        console.log(error);
      }
    } else {
      const requests = selectedEvents.map((e) => {
        const reservationRequest = {
          time: e.time,
          spaces: spaces,
          saunaId: saunaId,
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
          <SaunaChooser setSaunaId={setSaunaId} />
        </Card>
        <CalendarCard size={CardSizes.SMALL}>
          <Calendar date={date} setDate={setDate} minDate={new Date()} />
        </CalendarCard>
        <Card size={CardSizes.SMALL}>
          <EventsChooser
            saunaId={saunaId}
            dateDay={createDateDayFromDate(date)}
            spaces={spaces}
            selectedEvents={selectedEvents}
            setSelectedEvents={setSelectedEvents}
            isBookingFullSauna={wholeSauna}
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
