import { BasicCard, OuterContainer } from "./cardContainer.styled";

export enum CardSizes {
  EXTRA_SMALL = "EXTRA_SMALL",
  SMALL = "SMALL",
  BIG = "BIG",
  UNSET = "UNSET",
  FILL_PAGE = "FILL_PAGE",
}

export enum CardColors {
  PRIMARY = "PRIMARY",
  PRIMARY_LIGHT = "PRIMARY_LIGHT",
  DEFAULT = "DEFAULT",
}

type CardContainerProps = {
  children?: React.ReactNode;
  size?: CardSizes;
  color?: CardColors;
  className?: string;
};

const Card: React.FC<CardContainerProps> = (props) => {
  const { children, size } = props;
  return size === CardSizes.FILL_PAGE ? (
    <OuterContainer>
      <BasicCard {...props}>{children}</BasicCard>
    </OuterContainer>
  ) : (
    <BasicCard {...props}>{children}</BasicCard>
  );
};

export { Card };
