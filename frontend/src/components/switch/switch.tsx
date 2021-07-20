import { useState } from "react";
import { SliderSpan, SwitchLabel } from "./switch.styled";

type Props = {
  initialValue?: boolean;
};

const Switch: React.FC<Props> = (props: Props) => {
  const { initialValue = false } = props;
  const [state, setState] = useState(initialValue);
  return (
    <SwitchLabel>
      <input
        type="checkbox"
        onClick={() => setState((prev) => !prev)}
        checked={state}
      />
      <SliderSpan />
    </SwitchLabel>
  );
};
export { Switch };
export type { Props as SwitchProps };
