import { DateTime } from "../../dates/types";
import { dateTimeToISO } from "../../dates/helpers";

const getEventId = (time: DateTime) => {
  return dateTimeToISO(time, true, true, true, true);
};

export { getEventId };
