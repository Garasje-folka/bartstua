import { DateDay } from "utils/dist/dates/types";
import {
  BookingType,
  DropInEvent,
  EventLocation,
} from "utils/dist/bookingManagement/types";
import { firestore } from "../fireConfig";
import { getEventCollectionName } from "utils/dist/bookingManagement/helpers";

export const subscribeFullSaunaEvents = (
  date: DateDay,
  location: EventLocation,
  callback: (event: DropInEvent[]) => void
) => {
  const eventCollectionName = getEventCollectionName(BookingType.booking);

  const eventsQueryRef = firestore
    .collection("locations")
    .doc(location)
    .collection(eventCollectionName)
    .where("time.year", "==", date.year)
    .where("time.month", "==", date.month)
    .where("time.day", "==", date.day);

  const unsubscribe = eventsQueryRef.onSnapshot((querySnapshot) => {
    const events = querySnapshot.docs
      .map((doc) => doc.data() as DropInEvent)
      .sort((e1, e2) => e1.time.hour - e2.time.hour);
    callback(events);
  });

  return () => {
    unsubscribe();
  };
};
