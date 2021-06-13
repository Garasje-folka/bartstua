import * as pages from "../pages";
import * as paths from "./routeConstants";
import { Routing, GuardType } from "./types/routing";

export const routings: Routing[] = [
  {
    component: pages.Home,
    path: paths.HOME,
    guardType: GuardType.NONE,
  },
  {
    component: pages.Booking,
    path: paths.BOOKING,
    guardType: GuardType.VERIFICATION_CHECK,
    meta: true,
  },
  {
    component: pages.About,
    path: paths.ABOUT,
    guardType: GuardType.NONE,
  },
  {
    component: pages.Register,
    path: paths.REGISTER,
    guardType: GuardType.SIGN_IN_CHECK,
    meta: false,
  },
  {
    component: pages.Login,
    path: paths.SIGNIN,
    guardType: GuardType.SIGN_IN_CHECK,
    meta: false,
  },
  {
    component: pages.Verify,
    path: paths.VERIFY,
    guardType: GuardType.VERIFICATION_CHECK,
    meta: false,
  },
  {
    component: pages.PasswordChange,
    path: paths.PASSWORD_CHANGE,
    guardType: GuardType.VERIFICATION_CHECK,
    meta: true,
  },
];
