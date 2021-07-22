import { useState } from "react";
import { MAX_EVENT_SPACES } from "utils/dist/bookingManagement/constants";
import { EventData } from "utils/dist/bookingManagement/types";
import { Button } from "../../components/button";

type Props = {
  eventData: EventData;
  disabled?: boolean;
  selected?: boolean;
  onClickCallback: (event: EventData, selected: boolean) => void;
};

const EventButton: React.FC<Props> = (props: Props) => {
  const { eventData, disabled, selected, onClickCallback } = props;

  const onClick = () => {
    onClickCallback(eventData, !selected);
  };

  // TODO: Only temporary, needs styling
  const getText = () => {
    return `${eventData.date.hour}:00  ${
      MAX_EVENT_SPACES - eventData.spacesTaken
    } plasser (valgt: ${selected})`;
  };

  return (
    <Button onClick={onClick} disabled={disabled}>
      {getText()}
    </Button>
  );
};

export { EventButton };
export type { Props as EventButtonProps };
