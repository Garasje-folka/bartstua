import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MAX_DROP_IN_SPACES } from "utils/dist/bookingManagement/constants";
import { DropInEvent } from "utils/dist/bookingManagement/types";
import { isEqualTimes } from "utils/dist/dates/helpers";
import { DateDay } from "utils/dist/dates/types";
import { subscribeDropInEvents } from "../../services/bookingManagement";
import { getEventStartingHour } from "../../services/bookingManagement/helpers";
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
  dateDay: DateDay;
  spaces: number;
  selectedEvents: DropInEvent[];
  setSelectedEvents: React.Dispatch<React.SetStateAction<DropInEvent[]>>;
  isBookingFullSauna: boolean;
};

const EventsChooser = (props: Props) => {
  const {
    dateDay,
    spaces,
    selectedEvents,
    setSelectedEvents,
    isBookingFullSauna,
  } = props;
  const [events, setEvents] = useState<DropInEvent[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const subscribeEvents = isBookingFullSauna
      ? subscribeFullSaunaEvents
      : subscribeDropInEvents;

    const unsubscribe = subscribeEvents(dateDay, "FAKE_SAUNA_ID", (newEvents) =>
      setEvents(newEvents)
    );

    return () => {
      unsubscribe();
    };
  }, [dateDay, isBookingFullSauna]);

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

  const mapEvents = () => {
    const startingHour = getEventStartingHour(dateDay);
    if (!startingHour) return [];

    return events.map((e) => {
      if (e.time.hour >= startingHour) {
        const disabled = MAX_DROP_IN_SPACES - e.spacesTaken < spaces;
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
