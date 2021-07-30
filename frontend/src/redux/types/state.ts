import { currentUserState } from "../ducks/currentUser";
import { DropInReservationsState } from "../ducks/dropInReservations";

export interface State {
  currentUser: currentUserState;
  reservations: DropInReservationsState;
}
