import { InnerContainer, OuterContainer } from "./cardContainer.styled";

interface CardContainerProps {
  children?: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = (props) => {
  const { children } = props;
  return (
    <OuterContainer>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  );
};

export { CardContainer };
