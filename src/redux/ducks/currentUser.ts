import { User } from "../../services/userManagement/interfaces";
import { State } from "./types/state";

// Interfaces
interface Action {
  type: string;
  data?: {
    currentUser?: User | null;
  };
}

export interface currentUserState {
  data: {
    currentUser: User | null;
  };
  status: {
    loaded: boolean;
  };
}

// Constants
const file = "ducks/currentUser/";

// Actions
const AUTH_CHANGE = file + "AUTH_CHANGE";

// Initial state
const initialState = {
  data: {
    currentUser: null,
  },
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
        data: {
          ...state?.data,
          currentUser: currentUser ? { ...currentUser } : null,
        },
        status: {
          ...state?.status,
          loaded: true,
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
  return state.currentUser.data.currentUser;
};

export const loadedSelector = (state: State) => {
  return state.currentUser.status.loaded;
};
