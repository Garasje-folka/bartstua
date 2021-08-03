import { Icon, IconType } from "../../icons";
import {
  Content,
  Information,
  InformationRow,
  LeftArrowButton,
  ReadMoreButton,
  RightArrowButton,
  SaunaSwitcher,
  SaunaTitle,
  StyledImage,
  Wrapper,
} from "./saunaChooser.styled";

type Props = {
  dummyProp?: string; // TODO: Remove dummyProp
};

const SaunaChooser: React.FC<Props> = (props: Props) => {
  return (
    <Wrapper>
      <StyledImage src="https://thewellsite.blob.core.windows.net/media/ysnbkxwf/the-well-finsk-sauna.jpg" />
      <Content>
        <SaunaSwitcher>
          <LeftArrowButton>
            <Icon icon={IconType.LeftArrow} />
          </LeftArrowButton>
          <SaunaTitle>Badstue 1</SaunaTitle>
          <RightArrowButton>
            <Icon icon={IconType.RightArrow} />
          </RightArrowButton>
        </SaunaSwitcher>
        <Information>
          <InformationRow>Kapasitet: 10 personer</InformationRow>
          <InformationRow>Pris per plass: xx kr</InformationRow>
          <InformationRow>Pris for hele badstue: xx kr</InformationRow>
        </Information>
        <ReadMoreButton>Les mer</ReadMoreButton>
      </Content>
    </Wrapper>
  );
};

export { SaunaChooser };
export type { Props as SaunaChooserProps };
