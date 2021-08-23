import { DropInReservationData } from "utils/dist/bookingManagement/types";
import { Doc } from "utils/dist/types";
import { State } from "../types/state";

// Interfaces
interface Action {
  type: string;
  data?: {
    reservations: Doc<DropInReservationData>[];
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
const RESERVATIONS_UPDATE = file + "DROP_IN_RESERVATIONS_UPDATE";

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
    case RESERVATIONS_UPDATE:
      const reservations = action.data?.reservations;

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
  reservations: Doc<DropInReservationData>[]
): Action => {
  return { type: RESERVATIONS_UPDATE, data: { reservations } };
};

// Selectors
export const dropInReservationsSelector = (state: State) =>
  state.reservations.data;

export const dropInReservationsLoadedSelector = (state: State) => {
  return state.reservations.status.loaded;
};
