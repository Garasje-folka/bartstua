import { DateTime } from "../../dates/types";

export type FullSaunaEvent = {
  taken: boolean;
  time: DateTime;
  duration: number;
};

export type DropInEvent = {
  spacesTaken: number;
  time: DateTime;
  duration: number;
};
