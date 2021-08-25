import {} from "styled-components";
import { Theme } from "./app.theme";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {} // extends the global DefaultTheme with our ThemeType.
}
