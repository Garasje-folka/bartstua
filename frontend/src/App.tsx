import "bootstrap/dist/css/bootstrap.css";
import store from "./redux/store";
import { MainService } from "./mainService";
import { Provider } from "react-redux";
import { CustomRouter } from "./router/customRouter";
import { ThemeProvider } from "styled-components";
import { themeConfig } from "./app.theme";
import GoogleFontLoader from "react-google-font-loader";
import { FontProvider } from "./App-styled";

const App = () => {
  return (
    <>
      <GoogleFontLoader
        fonts={[
          {
            font: "Roboto",
            weights: [400, "400i"],
          },
          {
            font: "Roboto Mono",
            weights: [400, 700],
          },
        ]}
        subsets={["cyrillic-ext", "greek"]}
      />

      <Provider store={store}>
        <ThemeProvider theme={themeConfig}>
          <MainService />
          <FontProvider>
            <CustomRouter />
          </FontProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
