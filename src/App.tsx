import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/home";
import Booking from "./pages/booking";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "./components/header";
import About from "./pages/about";
import Register from "./pages/register";
import Login from "./pages/login";
import Verify from "./pages/verify";
import store from "./redux/store";
import { MainService } from "./mainService";
import { Provider } from "react-redux";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import { requireLogin } from "./router";
import {
  ABOUT,
  BOOKING,
  HOME,
  SIGNIN,
  REGISTER,
  VERIFY,
} from "./router/routeConstants";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <MainService />
          <Header />
          <GuardProvider guards={[requireLogin]}>
            <Switch>
              <Route exact path={HOME} component={Home} />
              <GuardedRoute path={BOOKING} component={Booking} />
              <Route path={ABOUT} component={About} />
              <Route path={REGISTER} component={Register} />
              <Route path={SIGNIN} component={Login} />
              <GuardedRoute path={VERIFY} component={Verify} />
            </Switch>
          </GuardProvider>
        </Router>
      </Provider>
    </>
  );
};

export default App;
