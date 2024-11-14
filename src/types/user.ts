export type AuthenticatedUser = {
  email: string;
  idToken: string;
  accessToken: string;
  accessTokenExpiresOn: number;
  refreshToken: string;
  refreshTokenExpiresOn: number;
  name: string;
  gender: string;
  birthday: string;
};
