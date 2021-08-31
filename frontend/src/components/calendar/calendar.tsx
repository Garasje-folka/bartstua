import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon, IconType } from "../../icons";
import {
  CalendarWrapper,
  DayName,
  DayNumber,
  DayWrapper,
  IconWrapper,
  MonthAndYear,
  MonthName,
  OuterCalendarWrapper,
  TopBar,
  YearName,
} from "./calendar.styled";

type CalendarProps = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  minDate: Date;
};

const getFirstMonday = (month: number, fullYear: number) => {
  const firstDayInMonth = new Date();
  firstDayInMonth.setMonth(month);
  firstDayInMonth.setFullYear(fullYear);
  firstDayInMonth.setDate(1);

  const firstDayInMonthDate = firstDayInMonth.getDay();

  const daysFromMonday =
    firstDayInMonthDate === 0 ? 6 : firstDayInMonthDate - 1;

  const firstMonday = new Date(firstDayInMonth);
  firstMonday.setDate(firstDayInMonth.getDate() - daysFromMonday);

  return firstMonday;
};

const generateDate = (month: number, fullYear: number) => {
  const dates: Date[] = [];
  const lastMonday = getFirstMonday(month, fullYear);
  for (let i = 0; i < 42; i++) {
    const currentIterationOfDate = new Date(lastMonday);
    currentIterationOfDate.setDate(lastMonday.getDate() + i);
    dates.push(currentIterationOfDate);
  }
  return dates;
};

const isSameDate = (date1: Date, date2: Date) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

const Calendar = (props: CalendarProps) => {
  const { date: selectedDate, setDate, minDate } = props;
  const { t } = useTranslation();

  const [currentMonth, setCurrentMonth] = useState<number>(
    selectedDate.getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    selectedDate.getFullYear()
  );

  useEffect(() => {
    setCurrentMonth(selectedDate.getMonth());
  }, [selectedDate, setCurrentMonth]);

  useEffect(() => {
    setCurrentYear(selectedDate.getFullYear());
  }, [selectedDate, setCurrentYear]);

  const handleNextMonth = () => {
    setCurrentMonth((oldMonth) => {
      if (oldMonth === 11) setCurrentYear((oldYear) => oldYear + 1);
      return oldMonth === 11 ? 0 : oldMonth + 1;
    });
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((oldMonth) => {
      if (oldMonth === 0) setCurrentYear((oldYear) => oldYear - 1);
      return oldMonth === 0 ? 11 : oldMonth - 1;
    });
  };

  return (
    <OuterCalendarWrapper>
      <TopBar>
        <IconWrapper onClick={handlePreviousMonth}>
          <Icon icon={IconType.LeftArrow} />
        </IconWrapper>
        <MonthAndYear>
          <MonthName>{t(`month_names.${currentMonth}`)}</MonthName>
          <YearName>{currentYear}</YearName>
        </MonthAndYear>
        <IconWrapper onClick={handleNextMonth}>
          <Icon icon={IconType.RightArrow} />
        </IconWrapper>
      </TopBar>
      <CalendarWrapper>
        {[1, 2, 3, 4, 5, 6, 0].map((weekDayNumber) => (
          <DayName key={weekDayNumber}>
            {t(`short_form_week_days.${weekDayNumber}`)}
          </DayName>
        ))}
        {generateDate(currentMonth, currentYear).map((currentDate) => {
          const disabled = currentDate < minDate;
          const isSelectedDate = isSameDate(selectedDate, currentDate);
          return (
            <DayWrapper
              key={JSON.stringify(currentDate)}
              thisMonth={currentDate.getMonth() === currentMonth}
              isSelectedDate={isSelectedDate}
              onClick={() => !disabled && setDate(currentDate)}
              disabled={disabled}
            >
              <DayNumber
                disabled={disabled}
                isSelectedDate={isSelectedDate}
                thisMonth={currentDate.getMonth() === currentMonth}
              >
                {currentDate.getDate()}
              </DayNumber>
            </DayWrapper>
          );
        })}
      </CalendarWrapper>
    </OuterCalendarWrapper>
  );
};

export { Calendar };
export type { CalendarProps };
