import "bootstrap/dist/css/bootstrap.css";
import store from "./redux/store";
import { MainService } from "./mainService";
import { Provider } from "react-redux";
import { CustomRouter } from "./router/customRouter";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <MainService />
        <CustomRouter />
      </Provider>
    </>
  );
};

export default App;
