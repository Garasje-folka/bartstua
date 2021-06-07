import { useContext } from "react";
import { Context } from "../store";

const useGlobalState = () => {
  return useContext(Context);
};

export default useGlobalState;
