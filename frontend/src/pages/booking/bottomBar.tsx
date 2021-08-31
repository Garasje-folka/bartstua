import { FunctionComponent } from "react";
import { Button } from "react-bootstrap";
import { DropInEvent } from "utils/dist/bookingManagement/types";

import { useHistory } from "react-router-dom";

type Props = {
  onClickAddToCart: () => void;
  onClickBookNow: () => void;
  selectedEvents: DropInEvent[];
};

const BottomBar: FunctionComponent<Props> = ({
  onClickAddToCart,
  onClickBookNow,
  selectedEvents,
}) => {
  const history = useHistory();

  return (
    <div style={{ minWidth: "100%", backgroundColor: "white" }}>
      <Button onClick={onClickAddToCart} disabled={selectedEvents.length === 0}>
        Legg til i handlekurv
      </Button>
      &nbsp;
      <Button onClick={onClickBookNow} disabled={selectedEvents.length === 0}>
        Bestill nå
      </Button>
    </div>
  );
};

export { BottomBar };
export type { Props as bottomBarProps };
