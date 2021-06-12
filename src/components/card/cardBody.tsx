import { StyledBodyWrapper } from "./cardBody.styled";
import { ContentContainer } from "./card.styled";

interface CardBodyProps {
  children?: React.ReactNode;
}
const CardBody: React.FC<CardBodyProps> = (props) => {
  const { children } = props;
  return (
    <StyledBodyWrapper>
      <ContentContainer>{children}</ContentContainer>
    </StyledBodyWrapper>
  );
};

export { CardBody };
