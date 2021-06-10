import "bootstrap/dist/css/bootstrap.css";
import {
  Home,
  Booking,
  About,
  Register,
  Login,
  Verify,
  PasswordChange,
} from "./pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import store from "./redux/store";
import { MainService } from "./mainService";
import { Provider } from "react-redux";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import { requireLogin } from "./router";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <MainService />
          <Header />
          <GuardProvider guards={[requireLogin]}>
            <Switch>
              <Route exact path="/" component={Home} />
              <GuardedRoute path="/booking" component={Booking} />
              <Route path="/about" component={About} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <GuardedRoute path="/verify" component={Verify} />
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
