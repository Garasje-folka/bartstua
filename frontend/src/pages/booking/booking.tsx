import { useEffect, useState } from "react";
import { Calendar } from "../../components/calendar/calendar";
import { backgroundTypes, useBackground } from "../../hooks/useBackground";
import {
  CalendarCard,
  Card,
  CardColors,
  CardSizes,
  CenterContentProvider,
  ContentContainer,
} from "./booking.styled";
import { SpacesCounter } from "./spacesCounter";
import { SaunaChooser } from "./saunaChooser";
import { EventsChooser } from "./eventsChooser";
import { createDateDayFromDate } from "utils/dist/dates/helpers";
import {
  DropInEvent,
  DropInReservationRequest,
  EventLocation,
} from "utils/dist/bookingManagement/types";
import { Button } from "../../components/button";
import { addDropInReservations } from "../../services/bookingManagement";

const Booking = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [spaces, setSpaces] = useState<number>(1);
  const [selectedEvents, setSelectedEvents] = useState<DropInEvent[]>([]);
  const { switchBackground } = useBackground();

  useEffect(() => {
    switchBackground(backgroundTypes.BOOKING_WALLPAPER);
  }, [switchBackground]);

  useEffect(() => {
    setSelectedEvents([]);
  }, [spaces, date]);

  const addToCart = async () => {
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
        <CalendarCard size={CardSizes.BIG}>
          <EventsChooser
            dateDay={createDateDayFromDate(date)}
            spaces={spaces}
            selectedEvents={selectedEvents}
            setSelectedEvents={setSelectedEvents}
          ></EventsChooser>
        </CalendarCard>
        <CalendarCard
          size={CardSizes.EXTRA_SMALL}
          color={CardColors.PRIMARY_LIGHT}
        >
          <SpacesCounter spaces={spaces} setSpaces={setSpaces} />
        </CalendarCard>
        <Button onClick={addToCart} disabled={selectedEvents.length === 0}>
          Legg til i handlekurv
        </Button>
      </ContentContainer>
    </CenterContentProvider>
  );
};

export { Booking };
