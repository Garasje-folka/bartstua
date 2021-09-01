import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SaunaData } from "utils/dist/bookingManagement/types";
import { DropInEvent } from "utils/dist/bookingManagement/types";
import { isEqualTimes, isToday } from "utils/dist/dates/helpers";
import { DateDay } from "utils/dist/dates/types";
import { Doc } from "utils/dist/types";
import { subscribeDropInEvents } from "../../services/bookingManagement";
import { subscribeFullSaunaEvents } from "../../services/bookingManagement/subscribeFullSaunaEvents";
import { EventButton } from "./eventButton";
import {
  DeselectedCircle,
  Content,
  DescriptionWrapper,
  SelectedCircle,
  Description,
  DescriptionText,
  Wrapper,
} from "./eventsChooser.styled";

type Props = {
  sauna: Doc<SaunaData> | undefined;
  dateDay: DateDay;
  spaces: number;
  selectedEvents: DropInEvent[];
  setSelectedEvents: React.Dispatch<React.SetStateAction<DropInEvent[]>>;
  isBookingFullSauna: boolean;
};

const EventsChooser = (props: Props) => {
  const {
    sauna,
    dateDay,
    spaces,
    selectedEvents,
    setSelectedEvents,
    isBookingFullSauna,
  } = props;
  const [events, setEvents] = useState<DropInEvent[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (sauna) {
      const subscribeEvents = isBookingFullSauna
        ? subscribeFullSaunaEvents
        : subscribeDropInEvents;

      const unsubscribe = subscribeEvents(dateDay, sauna.id, (newEvents) =>
        setEvents(newEvents)
      );

      return () => {
        unsubscribe();
      };
    }
  }, [sauna, dateDay, isBookingFullSauna]);

  const onClickCallback = (event: DropInEvent, selected: boolean) => {
    setSelectedEvents((prevVal) => {
      if (selected) return [...prevVal, event];

      return prevVal.filter((e) => !isEqualTimes(e.time, event.time));
    });
  };

  const selectedEventsContains = (event: DropInEvent) => {
    for (const e of selectedEvents) {
      if (isEqualTimes(e.time, event.time)) return true;
    }

    return false;
  };

  // Assumes that the selected day is not in the past
  const mapEvents = () => {
    if (!sauna) return [];

    const date = new Date();
    const currentMinuteSum = date.getMinutes() + date.getHours() * 60;
    return events.map((e) => {
      // Filter out events that have passed
      const eventMinuteSum = e.time.minute + e.time.hour * 60;
      if (!isToday(dateDay) || eventMinuteSum >= currentMinuteSum) {
        const disabled = sauna.data.capacity - e.spacesTaken < spaces;
        const selected = selectedEventsContains(e);

        return (
          <EventButton
            key={JSON.stringify(e.time)}
            event={e}
            disabled={disabled}
            selected={selected}
            onClickCallback={onClickCallback}
          />
        );
      }
      return null;
    });
  };

  return (
    <Wrapper>
      <DescriptionWrapper>
        <Description>
          <DeselectedCircle />
          <DescriptionText>{t("label_not_choosen_events")}</DescriptionText>
        </Description>
        <Description>
          <SelectedCircle />
          <DescriptionText>{t("label_choosen_events")}</DescriptionText>
        </Description>
      </DescriptionWrapper>
      <Content>{mapEvents()}</Content>
    </Wrapper>
  );
};

export { EventsChooser };
export type { Props as EventsChooserProps };
