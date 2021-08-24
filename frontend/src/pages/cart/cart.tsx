import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/button";
import { CardBody, CardContainer, CardHeader } from "../../components/card";
import { DropInCartItem } from "../../components/dropInCartItem";
import { Heading, Paragraph } from "../../components/text";
import { dropInReservationsSelector } from "../../redux/ducks/dropInReservations";
import { CHECKOUT } from "../../router/routeConstants";
import { Header } from "../booking/spacesCounter.styled";
import { backgroundTypes, useBackground } from "../../hooks/useBackground";
import { useEffect } from "react";
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
import { ParagraphContainer } from "../signIn/signIn.styled";

const Cart = () => {
  const reservations = useSelector(dropInReservationsSelector);
  const history = useHistory();

  const { switchBackground } = useBackground();

  useEffect(() => {
    switchBackground(backgroundTypes.BOOKING_WALLPAPER);
  }, [switchBackground]);

  return (
    <Background>
      <MainContainer>
        <HeadingContainer>
          <Heading type={Heading.types.HEADING3}>Min handlekurv</Heading>
        </HeadingContainer>
        <CartContainer>
          {reservations.map((res, index) => (
            <DropInCartItem dropInReservationDoc={res} key={index} />
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
              disabled={reservations.length === 0}
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
