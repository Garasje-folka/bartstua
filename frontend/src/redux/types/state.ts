import { currentUserState } from "../ducks/currentUser";
import { DropInReservationsState } from "../ducks/dropInReservations";
import { FullSaunaReservationsState } from "../ducks/fullSaunaReservations";

export interface State {
  currentUser: currentUserState;
  dropInReservations: DropInReservationsState;
  fullSaunaReservations: FullSaunaReservationsState;
}
