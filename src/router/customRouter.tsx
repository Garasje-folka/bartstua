import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../redux/selectors";
import { loadedSelector } from "../redux/ducks/currentUser";
import { routings } from "./routings";
import { signInCheck, verifiedEmailCheck } from "./guards";
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

              switch (routing.guardType) {
                case GuardType.SIGN_IN_CHECK:
                  guardFunction = signInCheck(
                    currentUser,
                    routing.expectedValue
                  );
                  break;
                case GuardType.VERIFICATION_CHECK:
                  guardFunction = verifiedEmailCheck(
                    currentUser,
                    routing.expectedValue
                  );
                  break;
              }

              return (
                <GuardedRoute
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
