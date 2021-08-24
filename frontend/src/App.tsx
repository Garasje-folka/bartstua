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
import { BackgroundProvider } from "./components/backgroundProvider/backgroundProvider";
import { useEffect } from "react";

const stripePromise = loadStripe(
  "pk_test_51J8ooNCgA1stADyYs9YFrQfaFn30XOHqSC3JHYMqF71Zypq8qak2f8xkv83qEdueDGsHzlWCUlqqAsEFZRfajQDZ00llM6Ed5w"
);
const fontConfig = [
  {
    font: "Roboto",
    weights: [100, 200, 300, 400, 500, 600, 700],
  },
];

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <GoogleFontLoader
        fonts={fontConfig}
        subsets={["cyrillic-ext", "greek"]}
      />
      <Provider store={store}>
        <ThemeProvider theme={themeConfig}>
          <BackgroundProvider>
            <MainService />
            <FontProvider>
              <CustomRouter />
            </FontProvider>
          </BackgroundProvider>
        </ThemeProvider>
      </Provider>
    </Elements>
  );
};

export default App;
