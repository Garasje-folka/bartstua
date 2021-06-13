import * as pages from "../pages";
import * as paths from "./routeConstants";
import { Routing } from "./types/routing";

export const routings: Routing[] = [
  {
    component: pages.Home,
    path: paths.HOME,
    signInRequired: false,
    verificationRequired: false,
  },
  {
    component: pages.Booking,
    path: paths.BOOKING,
    signInRequired: true,
    verificationRequired: true,
  },
  {
    component: pages.About,
    path: paths.ABOUT,
    signInRequired: false,
    verificationRequired: false,
  },
  {
    component: pages.Register,
    path: paths.REGISTER,
    signInRequired: false,
    verificationRequired: false,
  },
  {
    component: pages.Login,
    path: paths.SIGNIN,
    signInRequired: false,
    verificationRequired: false,
  },
  {
    component: pages.Verify,
    path: paths.VERIFY,
    signInRequired: true,
    verificationRequired: false,
  },
  {
    component: pages.PasswordChange,
    path: paths.PASSWORD_CHANGE,
    signInRequired: true,
    verificationRequired: true,
  },
];
