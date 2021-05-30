import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/home";
import Booking from "./pages/booking";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import About from "./pages/about";

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/booking" component={Booking} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
