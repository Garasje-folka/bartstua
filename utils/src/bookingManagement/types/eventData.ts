import { DateTime } from "../../dates/types";

export type FullSaunaEvent = {
  taken: boolean;
  time: DateTime;
};

export type DropInEvent = {
  spacesTaken: number;
  time: DateTime;
};
