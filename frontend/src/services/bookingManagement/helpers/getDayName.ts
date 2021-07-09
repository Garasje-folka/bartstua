const getDayName = (date: Date) => {
  return date.toLocaleDateString("no-NO", { weekday: "long" });
};

export default getDayName;
