export type AuthenticatedUser = {
  email: string;
  idToken: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  name: string;
  gender: string;
  birthday: string;
};
