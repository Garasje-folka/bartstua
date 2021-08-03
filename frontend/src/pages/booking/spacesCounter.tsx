import { useState } from "react";
import { MAX_DROP_IN_SPACES } from "utils/dist/bookingManagement/constants";
import { Button, ButtonStyle } from "../../components/button";
import { Switch } from "../../components/switch/switch";
import { IconType } from "../../icons";
import {
  Wrapper,
  Header,
  CounterNumber,
  PlusMinusContainer,
  AllPlaces,
} from "./spacesCounter.styled";

type Props = {
  spaces: number;
  setSpaces: React.Dispatch<React.SetStateAction<number>>;
};

const SpacesCounter: React.FC<Props> = (props: Props) => {
  const { spaces, setSpaces } = props;
  const [maxSpacesSelected, setMaxSpacesSelected] = useState<boolean>(false);

  const updateSpaces = (change: number) => {
    setSpaces((prevSpaces) => prevSpaces + change);
  };

  const onMaxSpacesToggled = () => {
    setMaxSpacesSelected((prevVal) => {
      setSpaces(prevVal ? 1 : MAX_DROP_IN_SPACES);
      return !prevVal;
    });
  };

  return (
    <Wrapper>
      <Header>Antall plasser:</Header>
      <CounterNumber>{spaces}</CounterNumber>
      <PlusMinusContainer>
        <Button
          onClick={() => updateSpaces(-1)}
          buttonStyle={ButtonStyle.TRANSPARENT}
          disabled={spaces === 1 || maxSpacesSelected}
          icon={IconType.MinusSign}
        />
        <Button
          onClick={() => updateSpaces(1)}
          buttonStyle={ButtonStyle.TRANSPARENT}
          disabled={spaces === MAX_DROP_IN_SPACES || maxSpacesSelected}
          icon={IconType.PlusSign}
        />
      </PlusMinusContainer>
      <AllPlaces>
        Alle plasser:
        <Switch value={maxSpacesSelected} onToggle={onMaxSpacesToggled} />
      </AllPlaces>
    </Wrapper>
  );
};

export { SpacesCounter };
export type { Props as SpacesCounterProps };
