import { DateTime } from "../../dates/types";
import { isBeforeToday } from "../../dates/helpers";
import { isToday } from "../../dates/helpers";
import { isValidDateTime } from "../../dates/helpers";

const isValidEventTime = (date: DateTime) => {
  if (!isValidDateTime(date)) return false;
  if (isBeforeToday(date)) return false;

  const currentDate = new Date();
  if (isToday(date)) {
    const currentMinuteSum =
      currentDate.getHours() * 60 + currentDate.getMinutes();
    const eventMinuteSum = date.hour * 60 + date.minute;
    return currentMinuteSum < eventMinuteSum;
  }

  return true;
};

export { isValidEventTime };
