import { useEffect, useState } from "react";
import { SaunaData } from "utils/dist/bookingManagement/types";
import { Doc } from "utils/dist/types";
import { useAsyncOnMount } from "../../hooks/useAsyncOnMount";
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

export type SaunaChooserProps = {
  setSaunaId: React.Dispatch<React.SetStateAction<string>>;
};

const SaunaChooser: React.FC<SaunaChooserProps> = (
  props: SaunaChooserProps
) => {
  const { setSaunaId } = props;
  const [saunas, setSaunas] = useState<Doc<SaunaData>[]>([]);
  const [saunaIndex, setSaunaIndex] = useState<number>(0);

  useAsyncOnMount(getSaunas, setSaunas);

  useEffect(() => {
    if (saunas.length > 0) {
      setSaunaId(saunas[saunaIndex].id);
    }
  }, [saunas, setSaunaId, saunaIndex, setSaunaIndex]);

  const updateSaunaIndex = (change: number) => {
    setSaunaIndex((prevSaunaIndex) => prevSaunaIndex + change);
  };

  return (
    <Wrapper>
      {saunas.length > 0 && (
        <StyledImage src={saunas[saunaIndex].data.imageUrl} />
      )}
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
