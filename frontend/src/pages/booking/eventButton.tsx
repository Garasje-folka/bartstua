import { DropInEvent } from "utils/dist/bookingManagement/types";
import { StyledButton, TimeContainer } from "./eventButton.styled";
import { getTimeRangeString } from "utils/dist/bookingManagement/helpers";

type Props = {
  event: DropInEvent;
  disabled?: boolean;
  selected?: boolean;
  onClickCallback: (event: DropInEvent, selected: boolean) => void;
};

const EventButton: React.FC<Props> = (props: Props) => {
  const { event, disabled, selected, onClickCallback } = props;

  const onClick = () => {
    onClickCallback(event, !selected);
  };

  return (
    <StyledButton selected={!!selected} onClick={onClick} disabled={disabled}>
      <TimeContainer>
        {getTimeRangeString(event.time, event.duration)}
      </TimeContainer>
    </StyledButton>
  );
};

export { EventButton };
export type { Props as EventButtonProps };
