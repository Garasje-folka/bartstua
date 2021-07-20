import { Icon, IconType } from "../../icons/iconGenerator";
import { DateLabel, StyledCalendar, Wrapper } from "./calendar.styled";

type Props = {
  dummyProp?: string; // TODO: Remove dummyProp
};

const Calendar: React.FC<Props> = (props: Props) => {
  return (
    <Wrapper>
      <StyledCalendar
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
export type { Props as CalendarProps };
