const isToday = (date: Date) => {
  let currentDate = new Date();
  return (
    date.getFullYear() === currentDate.getFullYear() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getDay() === currentDate.getDay()
  );
};

export { isToday };
