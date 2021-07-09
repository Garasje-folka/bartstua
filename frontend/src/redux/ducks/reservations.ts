import { BookingData, User } from "utils";
import { State } from "../types/state";

// Interfaces
interface Action {
  type: string;
  data?: {
    reservations: BookingData[];
  };
}

export type ReservationsState = {
  data: BookingData[];
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
      const bookings = action.data?.reservations;
      return {
        data: bookings ? [...bookings] : [],
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
export const reservationsUpdated = (reservations: BookingData[]): Action => {
  return { type: RESERVATIONS_UPDATE, data: { reservations } };
};

// Selectors
export const reservationsSelector = (state: State) => state.reservations.data;

export const loadedSelector = (state: State) => {
  return state.reservations.status.loaded;
};
