import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/button";
import { CardBody, CardContainer, CardHeader } from "../../components/card";
import { DropInCartItem } from "../../components/dropInCartItem";
import { Heading } from "../../components/text";
import { dropInReservationsSelector } from "../../redux/ducks/dropInReservations";
import { CHECKOUT } from "../../router/routeConstants";
import { Header } from "../booking/spacesCounter.styled";
import {
  Background,
  MainContainer,
  CartContainer,
  CartButton,
} from "./cart.styled";

const Cart = () => {
  const reservations = useSelector(dropInReservationsSelector);
  const history = useHistory();

  return (
    <Background>
      <MainContainer>
        <Heading type={Heading.types.HEADING1}>Betalingsoversikt</Heading>
        <CartContainer>
          hei
          {reservations.map((res, index) => (
            <DropInCartItem dropInReservationDoc={res} key={index} />
          ))}
        </CartContainer>
        <CartButton
          disabled={reservations.length === 0}
          onClick={() => {
            history.push(CHECKOUT);
          }}
        >
          Til betaling
        </CartButton>
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
