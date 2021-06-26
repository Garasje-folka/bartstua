import "bootstrap/dist/css/bootstrap.css";
import store from "./redux/store";
import { MainService } from "./mainService";
import { Provider } from "react-redux";
import { CustomRouter } from "./router/customRouter";
import { ThemeProvider } from "styled-components";
import { themeConfig } from "./app.theme";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={themeConfig}>
          <MainService />
          <CustomRouter />
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
