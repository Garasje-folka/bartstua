import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DropInCartItem } from "../../components/dropInCartItem";
import { Heading, Paragraph } from "../../components/text";
import { dropInReservationsSelector } from "../../redux/ducks/dropInReservations";
import { fullSaunaReservationsSelector } from "../../redux/ducks/fullSaunaReservations";
import { CHECKOUT } from "../../router/routeConstants";
import {
  Background,
  MainContainer,
  CartContainer,
  CartButton,
  HeadingContainer,
  ButtonContainer,
  BottomContainer,
  TextContainer,
} from "./cart.styled";

const Cart = () => {
  const dropInReservations = useSelector(dropInReservationsSelector);
  const fullSaunaReservations = useSelector(fullSaunaReservationsSelector);
  const history = useHistory();

  return (
    <Background>
      <MainContainer>
        <HeadingContainer>
          <Heading type={Heading.types.HEADING3}>Min handlekurv</Heading>
        </HeadingContainer>
        <CartContainer>
          {dropInReservations.map((res, index) => (
            <DropInCartItem
              reservationDoc={res}
              isBookingFullSauna={false}
              key={index}
            />
          ))}
          {fullSaunaReservations.map((res, index) => (
            <DropInCartItem
              reservationDoc={res}
              isBookingFullSauna={true}
              key={index}
            />
          ))}
        </CartContainer>
        <BottomContainer>
          <TextContainer>
            <Paragraph type={Paragraph.types.PARAGRAPH1}>
              NB! Bestillingen reserveres i 15 min i handlekurven og under
              betaling.
            </Paragraph>
          </TextContainer>
          <ButtonContainer>
            <CartButton
              disabled={dropInReservations.length === 0}
              onClick={() => {
                history.push(CHECKOUT);
              }}
            >
              Til betaling
            </CartButton>
          </ButtonContainer>
        </BottomContainer>
      </MainContainer>
    </Background>

    /* <CardContainer>
      <CardHeader title="Betalingsoversikt" />
      <CardBody>
        {reservations.map((res, index) => (
          <DropInCartItem dropInReservationDoc={res} key={index} />
        ))}
        <Button
          disabled={reservations.length === 0}
          onClick={() => {
            history.push(CHECKOUT);
          }}
        >
          Til Betaling
        </Button>
      </CardBody>
    </CardContainer> */
  );
};

export { Cart };
