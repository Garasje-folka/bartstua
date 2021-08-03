import { useContext } from "react";
import {
  BackgroundContext,
  BackgroundProvider,
} from "../components/backgroundProvider/backgroundProvider";

export const useBackground = () => useContext(BackgroundContext);
export const backgroundTypes = BackgroundProvider.types;
