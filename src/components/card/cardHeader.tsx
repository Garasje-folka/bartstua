import { StyledHeaderWrapper } from "./cardHeader.styled";
import { ContentContainer } from "./card.styled";
import { Heading, HeadingTypes } from "../text";
import { Divider } from "../divider";

interface CardHeaderProps {
  title: string;
}
const CardHeader: React.FC<CardHeaderProps> = (props) => {
  const { title } = props;
  return (
    <StyledHeaderWrapper>
      <ContentContainer>
        <Heading type={HeadingTypes.HEADING1}>{title}</Heading>
      </ContentContainer>
      <Divider />
    </StyledHeaderWrapper>
  );
};

export { CardHeader };
