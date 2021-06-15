import { User } from "../../types";
import { State } from "../types/state";

// Interfaces
interface Action {
  type: string;
  data?: {
    currentUser?: User | null;
  };
}

export interface currentUserState {
  data: User | null;
  status: {
    loaded: boolean;
    lastUpdated?: string;
  };
}

// Constants
const file = "ducks/currentUser/";

// Actions
const AUTH_CHANGE = file + "AUTH_CHANGE";

// Initial state
const initialState = {
  data: null,
  status: {
    loaded: false,
  },
};

// Reducer
export default function reducer(
  state: currentUserState = initialState,
  action: Action
): currentUserState {
  switch (action.type) {
    case AUTH_CHANGE:
      const currentUser = action.data?.currentUser;
      return {
        data: currentUser ? { ...currentUser } : null,
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
export const authChanged = (currentUser: User | null): Action => {
  return { type: AUTH_CHANGE, data: { currentUser } };
};

// Selectors
export const currentUserSelector = (state: State) => {
  return state.currentUser.data;
};

export const loadedSelector = (state: State) => {
  return state.currentUser.status.loaded;
};
