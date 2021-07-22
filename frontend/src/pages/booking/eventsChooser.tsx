import { useEffect, useState } from "react";
import { MAX_EVENT_SPACES } from "utils/dist/bookingManagement/constants";
import { EventData } from "utils/dist/bookingManagement/types";
import { isEqualDates } from "utils/dist/dates/helpers";
import { DateDay } from "utils/dist/dates/types";
import { subscribeEvents } from "../../services/bookingManagement";
import { getEventStartingHour } from "../../services/bookingManagement/helpers";
import { EventButton } from "./eventButton";
import { Content, Wrapper } from "./eventsChooser.styled";

type Props = {
  dateDay: DateDay;
  spaces: number;
  selectedEvents: EventData[];
  setSelectedEvents: React.Dispatch<React.SetStateAction<EventData[]>>;
};

const EventsChooser = (props: Props) => {
  const { dateDay, spaces, selectedEvents, setSelectedEvents } = props;
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeEvents(dateDay, (newEvents) =>
      setEvents(newEvents)
    );

    return () => {
      unsubscribe();
    };
  }, [dateDay]);

  const onClickCallback = (event: EventData, selected: boolean) => {
    setSelectedEvents((prevVal) => {
      if (selected) return [...prevVal, event];

      return prevVal.filter((e) => !isEqualDates(e.date, event.date));
    });
  };

  const selectedEventsContains = (event: EventData) => {
    for (const e of selectedEvents) {
      if (isEqualDates(e.date, event.date)) return true;
    }

    return false;
  };

  const mapEvents = () => {
    const startingHour = getEventStartingHour(dateDay);
    if (!startingHour) return [];

    return events.map((e) => {
      if (e.date.hour >= startingHour) {
        const disabled = MAX_EVENT_SPACES - e.spacesTaken < spaces;
        const selected = selectedEventsContains(e);

        return (
          <EventButton
            key={JSON.stringify(e.date)}
            eventData={e}
            disabled={disabled}
            selected={selected}
            onClickCallback={onClickCallback}
          />
        );
      }
    });
  };

  return (
    <Wrapper>
      <Content>{mapEvents()}</Content>
    </Wrapper>
  );
};

export { EventsChooser };
export type { Props as EventsChooserProps };
