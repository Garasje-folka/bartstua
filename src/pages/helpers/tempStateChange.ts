import { SetStateAction, Dispatch } from "react";

const tempStateChange = <Type>(
  newState: Type,
  defaultState: Type,
  setState: Dispatch<SetStateAction<Type>>,
  duration: number
) => {
  setState(newState);

  setTimeout(() => {
    setState(defaultState);
  }, duration);
};

export default tempStateChange;
