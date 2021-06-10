import moment from 'moment';

const parseDate = (date: Date) => {
    const parsedDate = moment(date, 'DD/MM/YYYY', true).format();
    // possibly format with: moment(date).format('DD/MM/YYYY');
    return parsedDate;
}

export default parseDate;