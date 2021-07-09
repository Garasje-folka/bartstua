import { BookingData } from "../../../../utils/dist";
import createDateFromDateDay from "../../services/bookingManagement/helpers/createDateFromDateDay";
import getDayName from "../../services/bookingManagement/helpers/getDayName";
import getHourRange from "../../services/bookingManagement/helpers/getHourRange";
import parseDateDay from "../../services/bookingManagement/helpers/parseDateDay";
import { CardBody, CardContainer } from "../card";
import { Heading, HeadingTypes } from "../text";
import { VeriticalAlignedTextContainer } from "./cartItem.styled";

export type CartItemProps = {
  booking: BookingData;
};

const CartItem = (props: CartItemProps) => {
  const { booking } = props;

  const getFormattedDate = () => {
    const dayName = getDayName(createDateFromDateDay(booking.date));
    const parsedDate = parseDateDay(booking.date, true, true, true);
    return `${dayName} ${parsedDate}`;
  };

  return (
    <CardContainer>
      <CardBody>
        <VeriticalAlignedTextContainer>
          <Heading type={HeadingTypes.HEADING4}>
            {`Dag: ${getFormattedDate()} `}
          </Heading>
          <Heading type={HeadingTypes.HEADING4}>
            {`Tidspunkt: ${getHourRange(booking.date.hour)}`}
          </Heading>
          <Heading type={HeadingTypes.HEADING4}>
            {`Antall plasser: ${booking.spaces}`}
          </Heading>
          <Heading type={HeadingTypes.HEADING4}>
            {`Pris: ${booking.spaces * 100} kr`}
          </Heading>
        </VeriticalAlignedTextContainer>
      </CardBody>
    </CardContainer>
  );
};

export { CartItem };
