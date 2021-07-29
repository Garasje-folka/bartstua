import { Reservation } from "utils/dist/bookingManagement/types";
import { Doc } from "utils/dist/types";
import { State } from "../types/state";

// Interfaces
interface Action {
  type: string;
  data?: {
    reservations: Doc<Reservation>[];
  };
}

export type ReservationsState = {
  data: Doc<Reservation>[];
  status: {
    loaded: boolean;
    lastUpdated?: string;
  };
};

// Constants
const file = "ducks/reservationsState/";

// Actions
const RESERVATIONS_UPDATE = file + "RESERVATIONS_UPDATE";

// Initial state
const initialState: ReservationsState = {
  data: [],
  status: {
    loaded: false,
  },
};

// Reducer
export default function reducer(
  state: ReservationsState = initialState,
  action: Action
): ReservationsState {
  switch (action.type) {
    case RESERVATIONS_UPDATE:
      const reservations = action.data?.reservations;
      return {
        data: reservations ? [...reservations] : [],
        status: {
          ...state?.status,
          loaded: true,
          lastUpdated: new Date().toJSON(),
        },
      };
    default:
      return state;
  }
}

// Action Creator
export const reservationsUpdated = (
  reservations: Doc<Reservation>[]
): Action => {
  return { type: RESERVATIONS_UPDATE, data: { reservations } };
};

// Selectors
export const reservationsSelector = (state: State) => state.reservations.data;

export const reservationsLoadedSelector = (state: State) => {
  return state.reservations.status.loaded;
};
