import React, { useState } from "react";
import { ContentWrapper, StyleContainer } from "./backgroundProvider.styled";
import { StyledWave } from "./backgroundProvider.styled";

type Props = {
  dummyProp?: string; // TODO: Remove dummyProp
  children: React.ReactNode;
};

export type Background = {
  url?: string;
  color: string;
  shaded?: boolean;
  tinted?: boolean;
  waves?: boolean;
};

const TYPES = {
  DEFAULT: {
    color: "#fff",
  },
  BOOKING_WALLPAPER: {
    color: "#fff",
    shaded: true,
    url: "https://assets.simpleview-europe.com/telemark2018/imageresizer/?image=%2Fdmsimgs%2FFlytende_badstuer_h_st_web_825060041.jpg&action=ProductDetailProFullWidth",
  },
  BOOKING_WALLPAPER_2: {
    color: "#EECD98",
    waves: true,
  },
};

export const BackgroundContext = React.createContext({
  currentBackground: TYPES.DEFAULT,
  switchBackground: (background: Background) => {},
});
BackgroundContext.displayName = "Background";

type BackgroundProviderComponent = React.FC<Props> & {
  types: typeof TYPES;
};

const BackgroundProvider: BackgroundProviderComponent = (props: Props) => {
  const { children } = props;
  const [currentBackground, setCurrentBackground] = useState<Background>(
    TYPES.DEFAULT
  );

  return (
    <BackgroundContext.Provider
      value={{ currentBackground, switchBackground: setCurrentBackground }}
    >
      <StyleContainer currentBackground={currentBackground}>
        {currentBackground.waves && <StyledWave />}
        <ContentWrapper>{children}</ContentWrapper>
      </StyleContainer>
    </BackgroundContext.Provider>
  );
};

BackgroundProvider.types = TYPES;

export { BackgroundProvider };
export type { Props as BackgroundProviderProps };
