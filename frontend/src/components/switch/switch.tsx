import { useState } from "react";
import { SliderSpan, SwitchLabel } from "./switch.styled";

type Props = {
  value: boolean;
  onToggle: () => void;
};

const Switch: React.FC<Props> = (props: Props) => {
  const { value, onToggle } = props;

  return (
    <SwitchLabel>
      <input type="checkbox" onChange={onToggle} checked={value} />
      <SliderSpan />
    </SwitchLabel>
  );
};
export { Switch };
export type { Props as SwitchProps };
