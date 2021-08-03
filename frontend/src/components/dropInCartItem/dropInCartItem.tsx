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
import { Heading } from "../text";
import { VeriticalAlignedTextContainer } from "./dropInCartItem.styled";

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
    <CardContainer>
      <CardBody>
        <VeriticalAlignedTextContainer>
          <Heading type={Heading.types.HEADING4}>
            {`Dag: ${getFormattedDate()} `}
          </Heading>
          <Heading type={Heading.types.HEADING4}>
            {`Tidspunkt: ${getHourRange(doc.data.time.hour)}`}
          </Heading>
          <Heading type={Heading.types.HEADING4}>
            {`Antall plasser: ${doc.data.spaces}`}
          </Heading>
          <Heading type={Heading.types.HEADING4}>
            {`Pris: ${doc.data.spaces * 100} kr`}
          </Heading>
          <Button onClick={handleReservationDelete}>Slett</Button>
        </VeriticalAlignedTextContainer>
      </CardBody>
    </CardContainer>
  );
};

export { DropInCartItem };
