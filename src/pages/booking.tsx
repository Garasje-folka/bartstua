import React from 'react';
import {DayPilotScheduler} from "daypilot-pro-react";
import { Button } from 'react-bootstrap';

interface SchedulerProps {}

class Scheduler extends React.Component<SchedulerProps, any> {

    constructor(props: SchedulerProps) {
        super(props);

        this.state = {
            events: [{id: 2,
                        text: "Reservation 2",
                        start: "2021-01-02T00:00:00",
                        end: "2021-01-05T00:00:00",
                        resource: "B",
                        barColor: "#38761d"}
                    ,{
                        id: 1,
                        text: "Reservation 1",
                        start: "2021-02-02T00:00:00",
                        end: "2021-02-04T00:00:00",
                        resource: "A",
                        barColor: "#3d85c6"
                    }]
                }
    }

    handleClick () {
        this.setState({ events : [{
                        id: 1,
                        text: "Reservation 1",
                        start: "2021-02-02T00:00:00",
                        end: "2021-02-04T00:00:00",
                        resource: "A",
                        barColor: "#3d85c6"
                    }]})
    }
    render() {
        return (
            <>
            <DayPilotScheduler
            startDate={"2021-01-01"}
                days={365}
                scale={"Day"}
                timeHeaders={[
                    {groupBy: "Month"},
                    {groupBy: "Day", format: "d"}
                ]}
            resources={[
                    {name: "Badestue 1", id: "A"},
                    {name: "Badestue 2", id: "B"},
            ]}
            events={ this.state.events }
                //events={ { this.state.events } }
                /*{
                        id: 1,
                        text: "Reservation 1",
                        start: "2021-02-02T00:00:00",
                        end: "2021-02-04T00:00:00",
                        resource: "A",
                        barColor: "#3d85c6"
                    },
                    {
                        id: 2,
                        text: "Reservation 2",
                        start: "2021-01-02T00:00:00",
                        end: "2021-01-05T00:00:00",
                        resource: "B",
                        barColor: "#38761d"
                    }
                */
            />
            <br></br>
            <Button onClick={ () => {this.handleClick()} }>Endre reservasjon</Button>
            <p>Din reservasjon er fra { this.state.events[0].start } til { this.state.events[0].end }</p>
            </>
        );
    }
}

const Booking: React.FC = () => {
  return (
      <div>
        <Scheduler />
      </div>
  );
}

export default Booking;