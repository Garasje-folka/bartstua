import { Doc } from "utils/dist/types";
import { BookingData } from "utils/dist/bookingManagement/types";
import { cancelReservation } from "../../services/bookingManagement";
import { createDateFromDateDay } from "utils/dist/dates/helpers";
import { getDayName } from "utils/dist/dates/helpers";
import { getHourRange } from "utils/dist/dates/helpers";
import { dateDayToISO } from "utils/dist/dates/helpers";
import { Button } from "../button";
import { CardBody, CardContainer } from "../card";
import { Heading, HeadingTypes } from "../text";
import { VeriticalAlignedTextContainer } from "./cartItem.styled";

export type CartItemProps = {
  bookingDoc: Doc<BookingData>;
};

const CartItem = (props: CartItemProps) => {
  const { bookingDoc } = props;

  const getFormattedDate = () => {
    const dayName = getDayName(createDateFromDateDay(bookingDoc.data.date));
    const parsedDate = dateDayToISO(bookingDoc.data.date, true, true, true);
    return `${dayName} ${parsedDate}`;
  };

  const handleReservationDelete = async () => {
    try {
      await cancelReservation(bookingDoc.id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CardContainer>
      <CardBody>
        <VeriticalAlignedTextContainer>
          <Heading type={HeadingTypes.HEADING4}>
            {`Dag: ${getFormattedDate()} `}
          </Heading>
          <Heading type={HeadingTypes.HEADING4}>
            {`Tidspunkt: ${getHourRange(bookingDoc.data.date.hour)}`}
          </Heading>
          <Heading type={HeadingTypes.HEADING4}>
            {`Antall plasser: ${bookingDoc.data.spaces}`}
          </Heading>
          <Heading type={HeadingTypes.HEADING4}>
            {`Pris: ${bookingDoc.data.spaces * 100} kr`}
          </Heading>
          <Button onClick={handleReservationDelete}>Slett</Button>
        </VeriticalAlignedTextContainer>
      </CardBody>
    </CardContainer>
  );
};

export { CartItem };
