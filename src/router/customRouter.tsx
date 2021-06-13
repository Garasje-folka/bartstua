import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { requireLogin } from "./";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../redux/selectors";
import { loadedSelector } from "../redux/ducks/currentUser";
import { routings } from "./routings";
import { requireVerifiedEmail } from "./guards";
import { GuardFunction } from "./types/guardFunction";
import { GuardedRoute } from "./guardedRoute";

const CustomRouter: React.FC = () => {
  const currentUser = useSelector(currentUserSelector);
  const userIsLoaded = useSelector(loadedSelector);

  const signedInChecker = requireLogin(currentUser);
  const verificationChecker = requireVerifiedEmail(currentUser);
  return (
    <>
      {userIsLoaded && (
        <Router>
          <Header />
          <Switch>
            {routings.map((routing) => {
              let guardFunction: GuardFunction | null = null;
              if (routing.signInRequired) guardFunction = signedInChecker;
              if (routing.verificationRequired)
                guardFunction = verificationChecker;
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
