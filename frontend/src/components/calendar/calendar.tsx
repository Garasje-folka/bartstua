import { Icon, IconType } from "../../icons";
import { DateLabel, StyledCalendar, Wrapper } from "./calendar.styled";

type CalendarProps = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  minDate?: Date;
};

const Calendar = (props: CalendarProps) => {
  const { date, setDate, minDate } = props;

  return (
    <Wrapper>
      <StyledCalendar
        value={date}
        onChange={setDate}
        minDate={minDate}
        locale="no-NO"
        formatDay={(locale, date) => date.getDate().toString()}
        nextLabel={
          <Icon icon={IconType.RightArrow} height="0.5em" width="0.5em" />
        }
        prevLabel={
          <Icon icon={IconType.LeftArrow} height="0.5em" width="0.5em" />
        }
      />
      <DateLabel>Torsdag 8. juli</DateLabel>
    </Wrapper>
  );
};

export { Calendar };
export type { CalendarProps };
