import { Button, ButtonStyle } from "../../components/button";
import { Switch } from "../../components/switch/switch";
import { Icon, IconType } from "../../icons/iconGenerator";
import {
  Wrapper,
  Header,
  CounterNumber,
  PlusMinusContainer,
  AllPlaces,
} from "./placesCounter.styled";

type Props = {
  dummyProp?: string; // TODO: Remove dummyProp
};

const PlacesCounter: React.FC<Props> = (props: Props) => {
  return (
    <Wrapper>
      <Header>Antall plasser:</Header>
      <CounterNumber>3</CounterNumber>
      <PlusMinusContainer>
        <Button
          icon={IconType.MinusSign}
          buttonStyle={ButtonStyle.TRANSPARENT}
        />
        <Button
          icon={IconType.PlusSign}
          buttonStyle={ButtonStyle.TRANSPARENT}
        />
      </PlusMinusContainer>
      <AllPlaces>
        Alle plasser:
        <Switch />
      </AllPlaces>
    </Wrapper>
  );
};

export { PlacesCounter };
export type { Props as PlacesCounterProps };
