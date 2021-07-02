enum GuardType {
  VERIFICATION_CHECK,
  EMAIL_SIGN_IN_CHECK,
  GUEST_SIGN_IN_CHECK,
  NONE,
}

interface Routing {
  path: string;
  component: React.ComponentType<any>;
  guardType: GuardType;
  expectedGuardValue?: boolean;
}

export type { Routing };
export { GuardType };
