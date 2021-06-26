import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { GuardFunction } from "./types/guardFunction";

interface GuardedRouteProps extends RouteProps<string> {
  guardFunction: GuardFunction | null;
}
const GuardedRoute: React.FC<GuardedRouteProps> = (props) => {
  const { guardFunction, ...rest } = props;

  if (!guardFunction) return <Route {...rest} />;

  const { accepted, redirectPath } = guardFunction();
  return accepted ? <Route {...rest} /> : <Redirect to={redirectPath} />;
};

export { GuardedRoute };
