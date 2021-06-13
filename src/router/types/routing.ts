interface Routing {
  path: string;
  component: React.ComponentType<any>;
  verificationRequired: boolean;
  signInRequired: boolean;
}

export type { Routing };
