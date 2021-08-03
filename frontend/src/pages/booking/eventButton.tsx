import { MAX_DROP_IN_SPACES } from "utils/dist/bookingManagement/constants";
import { DropInEvent } from "utils/dist/bookingManagement/types";
import { Button } from "../../components/button";

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

  // TODO: Only temporary, needs styling
  const getText = () => {
    return `${event.time.hour}:00  ${
      MAX_DROP_IN_SPACES - event.spacesTaken
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
