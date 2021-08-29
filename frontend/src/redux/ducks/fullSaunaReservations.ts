import { BookingReservationData as FullSaunaReservationData } from "utils/dist/bookingManagement/types";
import { Doc } from "utils/dist/types";
import { State } from "../types/state";

// Interfaces
interface Action {
  type: string;
  data?: {
    fullSaunaReservations: Doc<FullSaunaReservationData>[];
  };
}

export type FullSaunaReservationsState = {
  data: Doc<FullSaunaReservationData>[];
  status: {
    loaded: boolean;
    lastUpdated?: string;
  };
};

// Constants
const file = "ducks/fullSaunaReservations/";

// Actions
const FULL_SAUNA_RESERVATIONS_UPDATE = file + "FULL_SAUNA_RESERVATIONS_UPDATE";

// Initial state
const initialState: FullSaunaReservationsState = {
  data: [],
  status: {
    loaded: false,
  },
};

// Reducer
export default function reducer(
  state: FullSaunaReservationsState = initialState,
  action: Action
): FullSaunaReservationsState {
  switch (action.type) {
    case FULL_SAUNA_RESERVATIONS_UPDATE:
      const reservations = action.data?.fullSaunaReservations;

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
export const fullSaunaReservationsUpdated = (
  fullSaunaReservations: Doc<FullSaunaReservationData>[]
): Action => {
  console.log({ fullSaunaReservations });
  return {
    type: FULL_SAUNA_RESERVATIONS_UPDATE,
    data: { fullSaunaReservations },
  };
};

// Selectors
export const fullSaunaReservationsSelector = (state: State) =>
  state.fullSaunaReservations.data;

export const fullSaunaReservationsLoadedSelector = (state: State) => {
  return state.fullSaunaReservations.status.loaded;
};
