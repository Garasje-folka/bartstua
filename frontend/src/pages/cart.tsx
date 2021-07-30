import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { CardBody, CardContainer, CardHeader } from "../components/card";
import { DropInCartItem } from "../components/dropInCartItem";
import { dropInReservationsSelector } from "../redux/ducks/dropInReservations";
import { CHECKOUT } from "../router/routeConstants";

const Cart = () => {
  const reservations = useSelector(dropInReservationsSelector);
  const history = useHistory();

  return (
    <CardContainer>
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
    </CardContainer>
  );
};

export { Cart };
