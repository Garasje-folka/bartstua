import "bootstrap/dist/css/bootstrap.css";
import store from "./redux/store";
import { MainService } from "./mainService";
import { Provider } from "react-redux";
import { CustomRouter } from "./router/customRouter";
import { ThemeProvider } from "styled-components";
import { themeConfig } from "./app.theme";
import GoogleFontLoader from "react-google-font-loader";
import { FontProvider } from "./App.styled";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51J8ooNCgA1stADyYs9YFrQfaFn30XOHqSC3JHYMqF71Zypq8qak2f8xkv83qEdueDGsHzlWCUlqqAsEFZRfajQDZ00llM6Ed5w"
);

const fonts = [
  {
    font: "Roboto",
    weights: [100, "400i"],
  },
];

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <GoogleFontLoader fonts={fonts} subsets={["cyrillic-ext", "greek"]} />
      <Provider store={store}>
        <ThemeProvider theme={themeConfig}>
          <MainService />
          <FontProvider>
            <CustomRouter />
          </FontProvider>
        </ThemeProvider>
      </Provider>
    </Elements>
  );
};

export default App;
