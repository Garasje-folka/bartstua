import { useState } from "react";
import { MAX_EVENT_SPACES } from "utils/dist/bookingManagement/constants";
import { EventData } from "utils/dist/bookingManagement/types";
import { Button } from "../../components/button";
import {
  PlacesContainer,
  StyledButton,
  TimeContainer,
} from "./eventButton.styled";

type Props = {
  eventData: EventData;
  disabled?: boolean;
  selected: boolean;
  onClickCallback: (event: EventData, selected: boolean) => void;
};

const EventButton: React.FC<Props> = (props: Props) => {
  const { eventData, disabled, selected, onClickCallback } = props;

  const onClick = () => {
    onClickCallback(eventData, !selected);
  };

  return (
    <StyledButton selected={selected} onClick={onClick} disabled={disabled}>
      <TimeContainer>{`${eventData.date.hour}:00`}</TimeContainer>
      <PlacesContainer>{
        `${
          MAX_EVENT_SPACES - eventData.spacesTaken
        } plasser` /* TODO: (haryp2309) localise */
      }</PlacesContainer>
    </StyledButton>
  );
};

export { EventButton };
export type { Props as EventButtonProps };
