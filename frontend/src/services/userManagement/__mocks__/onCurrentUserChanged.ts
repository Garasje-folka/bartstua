import { User } from "utils";

let userChangedCallback: ((user: User | null) => void) | null = null;

const onCurrentUserChanged = (callback: (user: User | null) => void) => {
  userChangedCallback = callback;
  return () => (userChangedCallback = null);
};

export { onCurrentUserChanged, userChangedCallback };
