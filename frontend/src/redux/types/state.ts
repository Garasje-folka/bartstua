import { currentUserState } from "../ducks/currentUser";
import { ReservationsState } from "../ducks/reservations";

export interface State {
  currentUser: currentUserState;
  reservations: ReservationsState;
}
