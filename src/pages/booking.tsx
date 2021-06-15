import React, { useState } from "react";
import { DayPilotScheduler } from "daypilot-pro-react";
import { Button } from "react-bootstrap";
import { addBooking } from "../services/bookingManagement";

interface SchedulerProps {}
interface Event {
  id: number;
  text: string;
  start: string;
  end: string;
  resource: string;
  barColor: string;
}

const Scheduler: React.FC<SchedulerProps> = () => {
  const initialEvents: Event[] = [
    {
      id: 2,
      text: "Reservation 2",
      start: "2021-01-02T00:00:00",
      end: "2021-01-05T00:00:00",
      resource: "B",
      barColor: "#38761d",
    },
    {
      id: 1,
      text: "Reservation 1",
      start: "2021-02-02T00:00:00",
      end: "2021-02-04T00:00:00",
      resource: "A",
      barColor: "#3d85c6",
    },
  ];

  const [events, setEvents] = useState<Event[]>(initialEvents);

  const handleClick = () => {
    setEvents([
      {
        id: 1,
        text: "Reservation 1",
        start: "2021-02-02T00:00:00",
        end: "2021-02-04T00:00:00",
        resource: "A",
        barColor: "#3d85c6",
      },
    ]);

    addBooking(new Date());
  };

  return (
    <>
      <DayPilotScheduler
        startDate={"2021-01-01"}
        days={365}
        scale={"Day"}
        timeHeaders={[{ groupBy: "Month" }, { groupBy: "Day", format: "d" }]}
        resources={[
          { name: "Badestue 1", id: "A" },
          { name: "Badestue 2", id: "B" },
        ]}
        events={events}
      />
      <br></br>
      <Button onClick={handleClick}>Endre reservasjon</Button>
      {events.map((event) => (
        <p>
          Din reservasjon er fra {event.start} til {event.end}
        </p>
      ))}
    </>
  );
};

const Booking: React.FC = () => {
  return (
    <div>
      <Scheduler />
    </div>
  );
}

export { Booking };
