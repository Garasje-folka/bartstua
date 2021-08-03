import { SHARED_ERRORS } from "../../errors";

export const ADD_RESERVATION_ERRORS = {
  ...SHARED_ERRORS,
  NOT_ENOUGH_SPACE: "not-enough-space",
  INVALID_DATE: "invalid-date",
};
