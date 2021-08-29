import { DropInReservationData } from "utils/dist/bookingManagement/types";
import { Doc } from "utils/dist/types";
import { State } from "../types/state";

// Interfaces
interface Action {
  type: string;
  data?: {
    dropInReservations: Doc<DropInReservationData>[];
  };
}

export type DropInReservationsState = {
  data: Doc<DropInReservationData>[];
  status: {
    loaded: boolean;
    lastUpdated?: string;
  };
};

// Constants
const file = "ducks/dropInReservationsState/";

// Actions
const DROP_IN_RESERVATIONS_UPDATE = file + "DROP_IN_RESERVATIONS_UPDATE";

// Initial state
const initialState: DropInReservationsState = {
  data: [],
  status: {
    loaded: false,
  },
};

// Reducer
export default function reducer(
  state: DropInReservationsState = initialState,
  action: Action
): DropInReservationsState {
  switch (action.type) {
    case DROP_IN_RESERVATIONS_UPDATE:
      const reservations = action.data?.dropInReservations;

      return reservations
        ? {
            data: [...reservations],
            status: {
              ...state?.status,
              loaded: true,
              lastUpdated: new Date().toJSON(),
            },
          }
        : {
            ...state,
          };
    default:
      return state;
  }
}

// Action Creator
export const dropInReservationsUpdated = (
  dropInReservations: Doc<DropInReservationData>[]
): Action => {
  return { type: DROP_IN_RESERVATIONS_UPDATE, data: { dropInReservations } };
};

// Selectors
export const dropInReservationsSelector = (state: State) =>
  state.dropInReservations.data;

export const dropInReservationsLoadedSelector = (state: State) => {
  return state.dropInReservations.status.loaded;
};
