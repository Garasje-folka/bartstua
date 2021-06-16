import { BookingSession } from "../bookingSession";

interface bookingDateProps {
  date: Date;
}

const BookingDate = (props: bookingDateProps) => {
  const { date } = props;

  const getBookingSessions = () => {
    const currentHour = new Date().getHours();
    const sessions = [];

    for (let hour = currentHour; hour < 24; hour++) {
      const sessionDate = new Date(date);
      sessionDate.setHours(hour);

      sessions.push(<BookingSession key={hour} date={sessionDate} />);
    }

    return sessions;
  };

  return <>{getBookingSessions()}</>;
};

export { BookingDate };
