export type AuthenticatedUser = {
  email: string;
  idToken: string;
  accessToken: string;
  accessTokenExpiresOn: number;
  refreshToken: string;
  refreshTokenExpiresOn: number;
  name: string;
  picture: string;
  isGoogleUser: boolean;
};
