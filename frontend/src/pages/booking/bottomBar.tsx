import { FunctionComponent } from "react";
import { Button } from "react-bootstrap";
import { DropInEvent } from "utils/dist/bookingManagement/types";

import { useHistory } from "react-router-dom";
import {
  ButtonAddToCart,
  ButtonBookNow,
  ButtonHolder,
} from "./bottomBar.styled";
import { ButtonStyle } from "../../components/button";

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
    <ButtonHolder>
      <ButtonAddToCart
        onClick={onClickAddToCart}
        disabled={selectedEvents.length === 0}
        buttonStyle={ButtonStyle.REGULAR}
      >
        Legg til i handlekurv
      </ButtonAddToCart>
      &nbsp;
      <ButtonBookNow
        onClick={onClickBookNow}
        disabled={selectedEvents.length === 0}
        buttonStyle={ButtonStyle.REGULAR}
      >
        Bestill nå
      </ButtonBookNow>
    </ButtonHolder>
  );
};

export { BottomBar };
export type { Props as bottomBarProps };
