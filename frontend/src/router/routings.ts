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
    guardType: GuardType.NONE,
  },
  {
    component: pages.About,
    path: paths.ABOUT,
    guardType: GuardType.NONE,
  },
  {
    component: pages.Register,
    path: paths.REGISTER,
    guardType: GuardType.EMAIL_SIGN_IN_CHECK,
    expectedGuardValue: false,
  },
  {
    component: pages.SignIn,
    path: paths.SIGNIN,
    guardType: GuardType.EMAIL_SIGN_IN_CHECK,
    expectedGuardValue: false,
  },
  {
    component: pages.Verify,
    path: paths.VERIFY,
    guardType: GuardType.VERIFICATION_CHECK,
    expectedGuardValue: false,
  },
  {
    component: pages.PasswordChange,
    path: paths.PASSWORD_CHANGE,
    guardType: GuardType.EMAIL_SIGN_IN_CHECK,
    expectedGuardValue: true,
  },
  {
    component: pages.Checkout,
    path: paths.CHECKOUT,
    guardType: GuardType.HAS_RESERVATIONS_CHECK,
    expectedGuardValue: true,
  },
  {
    component: pages.Cart,
    path: paths.CART,
    guardType: GuardType.NONE,
  },
  {
    component: pages.EmailResetPassword,
    path: paths.EMAIL_RESET_PASSWORD,
    guardType: GuardType.NONE,
  },
];
