import { User } from "../services/userManagement/interfaces";
import { State } from "./types/state";

// Interfaces
interface Action {
  type: string;
  data?: {
    currentUser?: User | null;
  };
}

// Constants
const file = "ducks/currentUser/";

// Actions
const AUTH_CHANGE = file + "AUTH_CHANGE";

// Reducer
export default function reducer(state: User | null = null, action: Action) {
  switch (action.type) {
    case AUTH_CHANGE:
      const currentUser = action.data?.currentUser;
      return currentUser ? { ...currentUser } : null;
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
  return state.currentUser;
};
