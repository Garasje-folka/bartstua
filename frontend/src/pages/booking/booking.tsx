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
  SaunaData,
} from "utils/dist/bookingManagement/types";
import { Button } from "../../components/button";
import { addDropInReservations } from "../../services/bookingManagement";
import { BookingTypeChooser } from "./bookingTypeChooser";
import { addFullSaunaReservations } from "../../services/bookingManagement/addFullSaunaReservations";
import { Doc } from "utils/dist/types";

const Booking = () => {
  const [sauna, setSauna] = useState<Doc<SaunaData> | undefined>(undefined); // TODO: Maybe initalize as undefined?
  const [date, setDate] = useState<Date>(new Date());
  const [spaces, setSpaces] = useState<number>(1);
  const [wholeSauna, setWholeSauna] = useState<boolean>(false);
  const [selectedEvents, setSelectedEvents] = useState<DropInEvent[]>([]);

  useEffect(() => {
    setSelectedEvents([]);
  }, [spaces, date]);

  const addToCart = async () => {
    if (wholeSauna) {
      const reservations = selectedEvents.map((e) => ({
        time: e.time,
      }));

      const request = {
        saunaId: sauna?.id,
        reservations: reservations,
      } as FullSaunaReservationRequest;

      try {
        await addFullSaunaReservations(request);
      } catch (error) {
        console.log(error);
      }
    } else {
      const reservations = selectedEvents.map((e) => ({
        time: e.time,
        spaces: spaces,
      }));

      const request = {
        saunaId: sauna?.id,
        reservations: reservations,
      } as DropInReservationRequest;

      try {
        await addDropInReservations(request);
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
          <SaunaChooser setSauna={setSauna} />
        </Card>
        <CalendarCard size={CardSizes.SMALL}>
          <Calendar date={date} setDate={setDate} minDate={new Date()} />
        </CalendarCard>
        <Card size={CardSizes.SMALL}>
          <EventsChooser
            sauna={sauna}
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
            saunaCapacity={sauna ? sauna.data.capacity : 0}
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
