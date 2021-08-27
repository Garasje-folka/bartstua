import { Background } from "../../components/backgroundProvider/backgroundProvider";

enum GuardType {
  VERIFICATION_CHECK,
  EMAIL_SIGN_IN_CHECK,
  HAS_RESERVATIONS_CHECK,
  NONE,
}

interface Routing {
  path: string;
  component: React.ComponentType<any>;
  guardType: GuardType;
  expectedGuardValue?: boolean;
  background?: Background;
}

export type { Routing };
export { GuardType };
