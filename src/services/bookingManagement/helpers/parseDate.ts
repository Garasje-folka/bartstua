//import moment from "moment";

const parseDate = (date: Date) => {
  //const parsedDate = moment(date, "DD/MM/YYYY", true).format();

  // TODO: Could propably use a library instead
  const parsedDate =
    ("0" + date.getDate()).slice(-2) +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    date.getFullYear() +
    " " +
    ("0" + date.getHours()).slice(-2);

  // possibly format with: moment(date).format('DD/MM/YYYY');
  return parsedDate;
};

export default parseDate;
