import { DateTime } from "../../dates/types";

const getTimeRangeString = (time: DateTime, duration: number) => {
  const endMinuteSum = time.hour * 60 + time.minute + duration;
  const endHour = Math.floor(endMinuteSum / 60);
  const endMinute = endMinuteSum % endHour;

  const startTimeString =
    ("0" + time.hour).slice(-2) + ":" + ("0" + time.minute).slice(-2);

  const endTimeString =
    ("0" + endHour).slice(-2) + ":" + ("0" + endMinute).slice(-2);

  return `${startTimeString} - ${endTimeString}`;
};

export { getTimeRangeString };
