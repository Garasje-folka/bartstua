const createTimestamp = (offset: number) => {
  const currDate = new Date();
  return currDate.getTime() + offset * 60 * 1000;
};

export { createTimestamp };
