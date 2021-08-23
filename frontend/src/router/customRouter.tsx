import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../redux/selectors";
import { currentUserLoadedSelector } from "../redux/ducks/currentUser";
import { dropInReservationsLoadedSelector } from "../redux/ducks/dropInReservations";
import { routings } from "./routings";
import { emailSignInCheck, verifiedEmailCheck } from "./guards";
import { GuardFunction } from "./types/guardFunction";
import { GuardedRoute } from "./guardedRoute";
import { GuardType } from "./types/routing";
import { dropInReservationsSelector } from "../redux/ducks/dropInReservations";
import { hasReservationsCheck } from "./guards/hasReservationsCheck";
import { useEffect } from "react";

const CustomRouter: React.FC = () => {
  const currentUser = useSelector(currentUserSelector);
  const userLoaded = useSelector(currentUserLoadedSelector);
  const dropInReservations = useSelector(dropInReservationsSelector);
  const dropInReservationsLoaded = useSelector(
    dropInReservationsLoadedSelector
  );

  return (
    <>
      {userLoaded && dropInReservationsLoaded && (
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
                    dropInReservations,
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
