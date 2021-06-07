import * as React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { useDispatch } from "react-redux";
import { combineReducers } from "redux";
import * as reducers from "./ducks";
import { authChanged } from "./ducks/currentUser";
import { userManagement } from "./services";

const rootReducer = combineReducers(reducers);

const store = configureStore({
  reducer: rootReducer,
});

const AuthManager = () => {
  const dispatch = useDispatch();

  userManagement.onCurrentUserChanged((user) => {
    dispatch(authChanged(user));
  });
  return <></>;
};

const Store = (props: { children: any }) => {
  return (
    <Provider store={store}>
      <AuthManager />
      {props.children}
    </Provider>
  );
};

export default Store;
