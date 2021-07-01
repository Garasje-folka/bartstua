import { DateDay, DateHour } from "utils";

const parseDateDay = (
  date: DateDay | DateHour,
  inlcudeYear: boolean,
  includeMonth: boolean,
  includeDay: boolean
) => {
  let parsed = "";

  if (includeDay) parsed += ("0" + date.day).slice(-2) + "-";
  if (includeMonth) parsed += ("0" + date.month).slice(-2) + "-";
  if (inlcudeYear) parsed += date.year;

  if (parsed.slice(-1) === "-") parsed = parsed.slice(0, -1);

  return parsed;
};
export default parseDateDay;
