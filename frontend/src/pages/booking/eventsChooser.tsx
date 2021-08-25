import { useEffect, useState } from "react";
import { MAX_DROP_IN_SPACES } from "utils/dist/bookingManagement/constants";
import { DropInEvent, EventLocation } from "utils/dist/bookingManagement/types";
import { isEqualDates } from "utils/dist/dates/helpers";
import { DateDay } from "utils/dist/dates/types";
import { subscribeEvents } from "../../services/bookingManagement";
import { getEventStartingHour } from "../../services/bookingManagement/helpers";
import { EventButton } from "./eventButton";
import { Content, Wrapper } from "./eventsChooser.styled";

type Props = {
  dateDay: DateDay;
  spaces: number;
  selectedEvents: DropInEvent[];
  setSelectedEvents: React.Dispatch<React.SetStateAction<DropInEvent[]>>;
};

const EventsChooser = (props: Props) => {
  const { dateDay, spaces, selectedEvents, setSelectedEvents } = props;
  const [events, setEvents] = useState<DropInEvent[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeEvents(
      dateDay,
      EventLocation.loation1,
      (newEvents) => setEvents(newEvents)
    );

    return () => {
      unsubscribe();
    };
  }, [dateDay]);

  const onClickCallback = (event: DropInEvent, selected: boolean) => {
    setSelectedEvents((prevVal) => {
      if (selected) return [...prevVal, event];

      return prevVal.filter((e) => !isEqualDates(e.time, event.time));
    });
  };

  const selectedEventsContains = (event: DropInEvent) => {
    for (const e of selectedEvents) {
      if (isEqualDates(e.time, event.time)) return true;
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

  return <Wrapper>{mapEvents()}</Wrapper>;
};

export { EventsChooser };
export type { Props as EventsChooserProps };
