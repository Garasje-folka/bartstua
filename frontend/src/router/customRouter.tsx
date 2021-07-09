import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../redux/selectors";
import { currentUserLoadedSelector } from "../redux/ducks/currentUser";
import { reservationsLoadedSelector } from "../redux/ducks/reservations";
import { routings } from "./routings";
import { emailSignInCheck, verifiedEmailCheck } from "./guards";
import { GuardFunction } from "./types/guardFunction";
import { GuardedRoute } from "./guardedRoute";
import { GuardType } from "./types/routing";
import { reservationsSelector } from "../redux/ducks/reservations";
import { hasReservationsCheck } from "./guards/hasReservationsCheck";

const CustomRouter: React.FC = () => {
  const currentUser = useSelector(currentUserSelector);
  const userLoaded = useSelector(currentUserLoadedSelector);
  const reservations = useSelector(reservationsSelector);
  const reservationsLoaded = useSelector(reservationsLoadedSelector);

  return (
    <>
      {userLoaded && reservationsLoaded && (
        <Router>
          <Header />
          <Switch>
            {routings.map((routing) => {
              let guardFunction: GuardFunction | null = null;

              switch (routing.guardType) {
                case GuardType.EMAIL_SIGN_IN_CHECK:
                  guardFunction = emailSignInCheck(
                    currentUser,
                    routing.expectedGuardValue
                  );
                  break;
                case GuardType.VERIFICATION_CHECK:
                  guardFunction = verifiedEmailCheck(
                    currentUser,
                    routing.expectedGuardValue
                  );
                  break;
                case GuardType.HAS_RESERVATIONS_CHECK:
                  guardFunction = hasReservationsCheck(
                    reservations,
                    routing.expectedGuardValue
                  );
                  break;
              }

              return (
                <GuardedRoute
                  key={routing.path}
                  exact
                  path={routing.path}
                  component={routing.component}
                  guardFunction={guardFunction}
                />
              );
            })}
          </Switch>
        </Router>
      )}
    </>
  );
};

export { CustomRouter };
