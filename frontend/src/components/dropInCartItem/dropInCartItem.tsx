import { Doc } from "utils/dist/types";
import {
  BookingType,
  DropInReservationData,
} from "utils/dist/bookingManagement/types";
import { cancelReservation } from "../../services/bookingManagement";
import { createDateFromDateDay } from "utils/dist/dates/helpers";
import { getDayName } from "utils/dist/dates/helpers";
import { getHourRange } from "utils/dist/dates/helpers";
import { dateDayToISO } from "utils/dist/dates/helpers";
import { Button } from "../button";
import { CardBody, CardContainer } from "../card";
import { Heading, Paragraph } from "../text";
import {
  BackgroundReservation,
  ContentContainer,
  StyledImage,
  VeriticalAlignedTextContainer,
  ButtonContainer,
  DeleteButton,
} from "./dropInCartItem.styled";

export type CartItemProps = {
  dropInReservationDoc: Doc<DropInReservationData>;
};

const DropInCartItem = (props: CartItemProps) => {
  const { dropInReservationDoc: doc } = props;

  const getFormattedDate = () => {
    const dayName = getDayName(createDateFromDateDay(doc.data.time));
    const parsedDate = dateDayToISO(doc.data.time, true, true, true);
    return `${dayName} ${parsedDate}`;
  };

  const handleReservationDelete = async () => {
    try {
      await cancelReservation(doc.id, BookingType.dropIn);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BackgroundReservation>
      <StyledImage src="https://thewellsite.blob.core.windows.net/media/ysnbkxwf/the-well-finsk-sauna.jpg" />
      <ContentContainer>
        <VeriticalAlignedTextContainer>
          <Paragraph type={Paragraph.types.PARAGRAPH1}>
            {`Dag: ${getFormattedDate()} `}
          </Paragraph>
          <Paragraph type={Paragraph.types.PARAGRAPH1}>
            {`Tidspunkt: ${getHourRange(doc.data.time.hour)}`}
          </Paragraph>
          <Paragraph type={Paragraph.types.PARAGRAPH1}>
            {`Antall plasser: ${doc.data.spaces}`}
          </Paragraph>
          <Paragraph type={Paragraph.types.PARAGRAPH1}>
            {`Pris: ${doc.data.spaces * 100} kr`}
          </Paragraph>
        </VeriticalAlignedTextContainer>
        <ButtonContainer>
          <DeleteButton onClick={handleReservationDelete}> Slett </DeleteButton>
        </ButtonContainer>
      </ContentContainer>
    </BackgroundReservation>
  );
};

export { DropInCartItem };
