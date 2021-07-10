import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { CardBody, CardContainer, CardHeader } from "../components/card";
import { CartItem } from "../components/cartItem";
import { reservationsSelector } from "../redux/ducks/reservations";
import { CHECKOUT } from "../router/routeConstants";

const Cart = () => {
  const reservations = useSelector(reservationsSelector);
  const history = useHistory();

  return (
    <CardContainer>
      <CardHeader title="Betalingsoversikt" />
      <CardBody>
        {reservations.map((res, index) => (
          <CartItem booking={res} key={index} />
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
