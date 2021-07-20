import { useEffect } from "react";
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
import { PlacesCounter } from "./placesCounter";
import { SaunaChooser } from "./saunaChooser";

const Booking = () => {
  const { switchBackground } = useBackground();

  useEffect(() => {
    switchBackground(backgroundTypes.BOOKING_WALLPAPER);
  }, [switchBackground]);

  return (
    <CenterContentProvider>
      <ContentContainer>
        <Card size={CardSizes.BIG} color={CardColors.PRIMARY}>
          <SaunaChooser />
        </Card>
        <CalendarCard size={CardSizes.SMALL}>
          <Calendar />
        </CalendarCard>
        <CalendarCard
          size={CardSizes.EXTRA_SMALL}
          color={CardColors.PRIMARY_LIGHT}
        >
          <PlacesCounter />
        </CalendarCard>
      </ContentContainer>
    </CenterContentProvider>
  );
};

export { Booking };
