import React from "react";
import { useEffect } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { Background } from "../components/backgroundProvider/backgroundProvider";
import { backgroundTypes, useBackground } from "../hooks/useBackground";
import { GuardFunction } from "./types/guardFunction";

interface GuardedRouteProps extends RouteProps<string> {
  guardFunction: GuardFunction | null;
  background: Background | undefined;
}
const GuardedRoute: React.FC<GuardedRouteProps> = (props) => {
  const { guardFunction, background, ...rest } = props;
  const { switchBackground } = useBackground();

  useEffect(() => {
    if (background) switchBackground(background);
    else switchBackground(backgroundTypes.DEFAULT);
  }, [switchBackground, background]);

  if (!guardFunction) return <Route {...rest} />;

  const { accepted, redirectPath } = guardFunction();
  return accepted ? <Route {...rest} /> : <Redirect to={redirectPath} />;
};

export { GuardedRoute };
