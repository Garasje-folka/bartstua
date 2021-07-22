const isValidDate = (
  year: number,
  month: number,
  day: number,
  hour?: number
) => {
  if (!Number.isInteger(year) || year < 0) return false;

  if (!Number.isInteger(month) || month < 1 || month > 12) return false;

  if (!Number.isInteger(day) || day < 1 || day > 31) return false;

  if (hour && (!Number.isInteger(hour) || hour < 0 || hour > 23)) return false;

  if (month === 2) {
    if (isLeapYear(year)) return day <= 29;
    else return day <= 28;
  }

  if (month === 4 || month === 6 || month === 9 || month === 11) {
    return day <= 30;
  }

  return true;
};

const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export { isValidDate };
