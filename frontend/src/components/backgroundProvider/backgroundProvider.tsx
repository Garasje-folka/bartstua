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
  WAVE: {
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
