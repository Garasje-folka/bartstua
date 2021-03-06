import { useTranslation } from "react-i18next";
import { Icon, IconType } from "../../icons";
import {
  ActionArea,
  Header,
  CounterNumber,
  StyledButtonWrapper,
  SpacesCounterWrapper,
} from "./spacesCounter.styled";

type Props = {
  spaces: number;
  setSpaces: React.Dispatch<React.SetStateAction<number>>;
  saunaCapacity: number;
};

const SpacesCounter: React.FC<Props> = (props: Props) => {
  const { spaces, setSpaces, saunaCapacity } = props;
  const { t } = useTranslation();

  const updateSpaces = (change: number) => {
    setSpaces((prevSpaces) => prevSpaces + change);
  };

  const Button = ({
    disabled,
    icon,
    onClick,
  }: {
    disabled: boolean;
    icon: IconType;
    onClick: () => void;
  }) => (
    <StyledButtonWrapper
      onClick={() => !disabled && onClick()}
      disabled={disabled}
    >
      <Icon icon={icon} />
    </StyledButtonWrapper>
  );

  return (
    <SpacesCounterWrapper>
      <Header>{t("label_how_many_people")}</Header>
      <ActionArea>
        <Button
          onClick={() => updateSpaces(-1)}
          disabled={spaces === 1}
          icon={IconType.MinusSign}
        />

        <CounterNumber>{spaces}</CounterNumber>
        <Button
          disabled={spaces === saunaCapacity}
          icon={IconType.PlusSign}
          onClick={() => updateSpaces(1)}
        />
      </ActionArea>
    </SpacesCounterWrapper>
  );
};

export { SpacesCounter };
export type { Props as SpacesCounterProps };
