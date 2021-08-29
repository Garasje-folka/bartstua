import { Doc } from "utils/dist/types";
import {
  FullSaunaReservationData,
  BookingType,
  DropInReservationData,
} from "utils/dist/bookingManagement/types";
import { cancelReservation } from "../../services/bookingManagement";
import { createDateFromDateDay } from "utils/dist/dates/helpers";
import { getDayName } from "utils/dist/dates/helpers";
import { getHourRange } from "utils/dist/dates/helpers";
import { dateDayToISO } from "utils/dist/dates/helpers";
import {
  BackgroundReservation,
  ContentContainer,
  StyledImage,
  VeriticalAlignedTextContainer,
  ButtonContainer,
  DeleteButton,
} from "./dropInCartItem.styled";

export type CartItemProps = {
  reservationDoc: Doc<DropInReservationData> | Doc<FullSaunaReservationData>;
  isBookingFullSauna: boolean;
};

const isDropInChecker = (
  reservationDoc: Doc<DropInReservationData> | Doc<FullSaunaReservationData>,
  isBookingFullSauna: boolean
): reservationDoc is Doc<DropInReservationData> => {
  return !isBookingFullSauna;
};

const DropInCartItem = (props: CartItemProps) => {
  const { reservationDoc: doc, isBookingFullSauna } = props;

  const getFormattedDate = () => {
    const dayName = getDayName(createDateFromDateDay(doc.data.time));
    const parsedDate = dateDayToISO(doc.data.time, true, true, true);
    return `${dayName} ${parsedDate}`;
  };

  const handleReservationDelete = async () => {
    try {
      await cancelReservation(
        doc.id,
        isBookingFullSauna ? BookingType.fullSauna : BookingType.dropIn
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BackgroundReservation>
      <StyledImage src="https://thewellsite.blob.core.windows.net/media/ysnbkxwf/the-well-finsk-sauna.jpg" />
      <ContentContainer>
        <VeriticalAlignedTextContainer>
          <p>
            <strong>{`Dag: `}</strong>
            {`${getFormattedDate()} `}
          </p>
          <p>
            <strong>{`Tidspunkt: `}</strong>
            {`${getHourRange(doc.data.time.hour)}`}
          </p>
          {isDropInChecker(doc, isBookingFullSauna) ? (
            <p>
              <strong>{`Antall plasser: `}</strong>
              {`${doc.data.spaces}`}
            </p>
          ) : (
            <p>
              <strong>Hele badstuen</strong>
            </p>
          )}
          <p>
            <strong>{`Pris: `}</strong>
            {`${
              isDropInChecker(doc, isBookingFullSauna)
                ? doc.data.spaces * 199
                : 899
            } kr`}
          </p>
        </VeriticalAlignedTextContainer>
        <ButtonContainer>
          <DeleteButton onClick={handleReservationDelete}> Slett </DeleteButton>
        </ButtonContainer>
      </ContentContainer>
    </BackgroundReservation>
  );
};

export { DropInCartItem };
