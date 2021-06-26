interface GuardResult {
  accepted: boolean;
  redirectPath: string;
}
export type GuardFunction = () => GuardResult;
