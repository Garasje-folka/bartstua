import { Doc } from "utils/dist/types";
import {
  BookingReservationData,
  BookingType,
  Reservation,
  ReservationData,
  ReservationStatus,
} from "utils/dist/bookingManagement/types";
import { cancelReservation } from "../../services/bookingManagement";
import { createDateFromDateDay } from "utils/dist/dates/helpers";
import { getDayName } from "utils/dist/dates/helpers";
import { getHourRange } from "utils/dist/dates/helpers";
import { dateDayToISO } from "utils/dist/dates/helpers";
import { Button } from "../button";
import { CardBody, CardContainer } from "../card";
import { Heading } from "../text";
import { VeriticalAlignedTextContainer } from "./cartItem.styled";
import { bookingManagement } from "../../services";

export type CartItemProps = {
  reservationDoc: Doc<Reservation>;
};

/*
const CartItem = (props: CartItemProps) => {
  const { reservationDoc } = props;

  const getFormattedDate = () => {
    const dayName = getDayName(
      createDateFromDateDay(reservationDoc.data.data.time)
    );
    const parsedDate = dateDayToISO(
      reservationDoc.data.data.time,
      true,
      true,
      true
    );
    return `${dayName} ${parsedDate}`;
  };

  const handleReservationDelete = async () => {
    try {
      await cancelReservation(reservationDoc.id);
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
            {`Tidspunkt: ${getHourRange(bookingDoc.data.data.time.hour)}`}
          </Heading>
          <Heading type={Heading.types.HEADING4}>
            {`Antall plasser: ${bookingDoc.data.data.spaces}`}
          </Heading>
          <Heading type={Heading.types.HEADING4}>
            {`Pris: ${bookingDoc.data.data.spaces * 100} kr`}
          </Heading>
          <Button onClick={handleReservationDelete}>Slett</Button>
        </VeriticalAlignedTextContainer>
      </CardBody>
    </CardContainer>
  );
};

export { CartItem };
*/
