import { Dispatch, SetStateAction, useState } from "react";
import Calendar from "react-calendar";

// Move this to .styled file?
import "react-calendar/dist/Calendar.css";
import { MAX_EVENT_SPACES } from "utils/dist/bookingManagement/constants";
import { InputField } from "../../components/form";
import { LeftAlignedContent } from "../../components/header/header.styled";
import { Heading } from "../../components/text";
import { DatePickerContainer, OuterContainer } from "./datePicker.styled";

export type DatePickerProps = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  spaces: number;
  setSpaces: Dispatch<SetStateAction<number>>;
};

const DatePicker = (props: DatePickerProps) => {
  const { date, setDate, spaces, setSpaces } = props;

  const onSpacesChanged = (newSpaces: number) => {
    if (newSpaces <= 0 || newSpaces > MAX_EVENT_SPACES) return;

    setSpaces(newSpaces);
  };

  return (
    <OuterContainer>
      <Heading type={Heading.types.HEADING4}> Velg dato</Heading>
      <DatePickerContainer>
        <LeftAlignedContent>
          <InputField
            label="Hvor mange plasser?"
            type="number"
            value={spaces}
            onChange={(event) => onSpacesChanged(parseInt(event.target.value))}
          />
        </LeftAlignedContent>
        <Calendar
          onChange={setDate}
          value={date}
          locale="no-NO"
          minDate={new Date()}
        />
      </DatePickerContainer>
    </OuterContainer>
  );
};

export { DatePicker };
