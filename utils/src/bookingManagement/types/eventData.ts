import { DateTime } from "../../dates/types";

export type BookingEvent = {
  taken: boolean;
  time: DateTime;
};

export type DropInEvent = {
  spacesTaken: number;
  time: DateTime;
};
