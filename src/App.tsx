import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/home";
import Booking from "./pages/booking";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import About from "./pages/about";
import Register from "./pages/register";
import Login from "./pages/login";
import Verify from "./pages/verify";
import Store from "./store";

const App = () => {
  return (
    <>
      <Router>
        <Store>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/booking" component={Booking} />
            <Route path="/about" component={About} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/verify" component={Verify} />
          </Switch>
        </Store>
      </Router>
    </>
  );
};

export default App;
