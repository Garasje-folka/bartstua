export default interface User {
  emailVerified: boolean;
  uid: string;
  displayName: string | null;
  email: string | null;
  sendEmailVerification: () => Promise<void>;
}
