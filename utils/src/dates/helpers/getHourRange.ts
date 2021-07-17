const getHourRange = (startHour: number) => {
  return (
    ("0" + startHour).slice(-2) +
    ":00 - " +
    ("0" + (startHour + 1)).slice(-2) +
    ":00"
  );
};

export { getHourRange };
