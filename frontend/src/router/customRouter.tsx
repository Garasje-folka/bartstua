import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../redux/selectors";
import { loadedSelector } from "../redux/ducks/currentUser";
import { routings } from "./routings";
import { emailSignInCheck, verifiedEmailCheck } from "./guards";
import { GuardFunction } from "./types/guardFunction";
import { GuardedRoute } from "./guardedRoute";
import { GuardType } from "./types/routing";

const CustomRouter: React.FC = () => {
  const currentUser = useSelector(currentUserSelector);
  const userIsLoaded = useSelector(loadedSelector);

  return (
    <>
      {userIsLoaded && (
        <Router>
          <Header />
          <Switch>
            {routings.map((routing) => {
              let guardFunction: GuardFunction | null = null;

              // TODO: Add Guest user guard?
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
