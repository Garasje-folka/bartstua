import { StyledHeaderWrapper } from "./cardHeader.styled";
import { ContentContainer } from "./card.styled";
import { Heading } from "../text";
import { Divider } from "../divider";

interface CardHeaderProps {
  title: string;
}
const CardHeader: React.FC<CardHeaderProps> = (props) => {
  const { title } = props;
  return (
    <>
      <StyledHeaderWrapper>
        <ContentContainer>
          <Heading type={Heading.types.HEADING1}>{title}</Heading>
        </ContentContainer>
      </StyledHeaderWrapper>
      <Divider />
    </>
  );
};

export { CardHeader };
