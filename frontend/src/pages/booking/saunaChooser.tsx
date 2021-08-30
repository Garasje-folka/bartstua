import { useEffect, useState } from "react";
import { SaunaData } from "utils/dist/bookingManagement/types";
import { Doc } from "utils/dist/types";
import { Icon, IconType } from "../../icons";
import { getSaunas } from "../../services/bookingManagement";
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

const SaunaChooser: React.FC = () => {
  const [saunas, setSaunas] = useState<Doc<SaunaData>[]>([]);
  const [saunaIndex, setSaunaIndex] = useState<number>(0);

  useEffect(() => {
    getSaunas().then((saunas) => setSaunas(saunas));
  });

  const updateSaunaIndex = (change: number) => {
    setSaunaIndex((prevSaunaIndex) => prevSaunaIndex + change);
  };

  return (
    <Wrapper>
      <StyledImage src="https://thewellsite.blob.core.windows.net/media/ysnbkxwf/the-well-finsk-sauna.jpg" />
      <Content>
        <SaunaSwitcher>
          <LeftArrowButton
            onClick={() => updateSaunaIndex(-1)}
            disabled={saunaIndex === 0}
          >
            <Icon icon={IconType.LeftArrow} />
          </LeftArrowButton>
          <SaunaTitle>
            {saunas.length > 0 && saunas[saunaIndex].data.name}
          </SaunaTitle>
          <RightArrowButton
            onClick={() => updateSaunaIndex(-1)}
            disabled={saunaIndex >= saunas.length - 1}
          >
            <Icon icon={IconType.RightArrow} />
          </RightArrowButton>
        </SaunaSwitcher>
        <Information>
          {/* TODO: Clean up conditionals maybe */}
          <InformationRow>{`Kapasitet: ${
            saunas.length > 0 && saunas[saunaIndex].data.capacity
          } personer`}</InformationRow>
          <InformationRow>{`Pris for drop in: ${
            saunas.length > 0 && saunas[saunaIndex].data.dropInPrice
          } kr`}</InformationRow>
          <InformationRow>{`Pris for hele badstuen: ${
            saunas.length > 0 && saunas[saunaIndex].data.wholeSaunaPrice
          } kr`}</InformationRow>
        </Information>
        <ReadMoreButton>Les mer</ReadMoreButton>
      </Content>
    </Wrapper>
  );
};

export { SaunaChooser };
