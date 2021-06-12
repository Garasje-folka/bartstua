import "bootstrap/dist/css/bootstrap.css";
import { Home, Booking, About, Login, Register, Verify, PasswordChange } from "./pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "./components/header";
import store from "./redux/store";
import { MainService } from "./mainService";
import { Provider } from "react-redux";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import { requireLogin } from "./router";
import * as paths from "./router/routeConstants";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <MainService />
          <Header />
          <GuardProvider guards={[requireLogin]}>
            <Switch>
              <Route exact path={paths.HOME} component={Home} />
              <GuardedRoute path={paths.BOOKING} component={Booking} />
              <Route path={paths.ABOUT} component={About} />
              <Route path={paths.REGISTER} component={Register} />
              <Route path={paths.SIGNIN} component={Login} />
              <GuardedRoute path={paths.VERIFY} component={Verify} />
              <GuardedRoute
                path="/password-change"
                component={PasswordChange}
              />
            </Switch>
          </GuardProvider>
        </Router>
      </Provider>
    </>
  );
};

export default App;
