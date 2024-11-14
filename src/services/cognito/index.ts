import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  GetUserCommand,
  GlobalSignOutCommand,
  InitiateAuthCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { AuthenticatedUser } from "../../types/user";

export type CognitoLoginProps = {
  userName: string;
  passWord: string;
};

export type CognitoSignupProps = {
  email: string;
  password: string;
  birthdate: string;
  gender: string;
  fullname: string;
};

export type CognitoVerifyProps = { userName: string; otp: string };

export type CognitoUserAttributes = {
  name: string;
  gender: string;
  email: string;
  birthdate: string;
};

const client = new CognitoIdentityProviderClient({
  region: import.meta.env.VITE_COGNITO_CLIENT_REGION,
});

const login = async ({ passWord, userName }: CognitoLoginProps) => {
  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    AuthParameters: { USERNAME: userName, PASSWORD: passWord },
  });

  const result = await client.send(command);

  const user = await client.send(
    new GetUserCommand({
      AccessToken: result.AuthenticationResult?.AccessToken,
    })
  );

  const userData = user.UserAttributes?.reduce(
    (userData, curr) =>
      curr?.Name ? { [curr?.Name]: curr.Value, ...userData } : userData,
    {} as CognitoUserAttributes
  );

  const accessTokenExpiresOn =
    new Date(
      Date.now() + (result?.AuthenticationResult?.ExpiresIn ?? 0) * 1000 // cognito set to 1 hour
    ).getTime() ?? 0;

  const refreshTokenExpiresOn = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 29
  ).getTime(); // cognito set to 30 days but we use 29 days here ):

  return {
    accessToken: result.AuthenticationResult?.AccessToken ?? "",
    birthday: userData?.birthdate ?? "",
    email: userData?.email ?? "",
    accessTokenExpiresOn,
    gender: userData?.gender ?? "",
    idToken: result.AuthenticationResult?.IdToken ?? "",
    name: userData?.name ?? "",
    refreshToken: result.AuthenticationResult?.RefreshToken ?? "",
    refreshTokenExpiresOn: refreshTokenExpiresOn,
  } as AuthenticatedUser;
};

const logOut = async (user: AuthenticatedUser) => {
  await client.send(
    new GlobalSignOutCommand({ AccessToken: user.accessToken })
  );
};

const signUp = async ({
  password,
  email,
  birthdate,
  gender,
  fullname,
}: CognitoSignupProps) => {
  const command = new SignUpCommand({
    ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: "name", Value: email },
      { Name: "birthdate", Value: birthdate },
      { Name: "gender", Value: gender },
      { Name: "name", Value: fullname },
    ] as { Name: keyof CognitoUserAttributes; Value: string }[],
  });

  const result = await client.send(command);

  return result;
};

const verify = async ({ otp, userName }: CognitoVerifyProps) => {
  await client.send(
    new ConfirmSignUpCommand({
      ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
      ConfirmationCode: otp,
      Username: userName,
    })
  );
};

const refreshTokens = async (user: AuthenticatedUser) => {
  const command = new InitiateAuthCommand({
    AuthFlow: "REFRESH_TOKEN",
    ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    AuthParameters: { REFRESH_TOKEN: user.refreshToken },
  });

  const result = await client.send(command);
  const accessTokenExpiresOn =
    new Date(
      Date.now() + (result?.AuthenticationResult?.ExpiresIn ?? 0) * 1000 // cognito set to 1 hour
    ).getTime() ?? 0;

  return {
    ...user,
    accessTokenExpiresOn,
    accessToken: result.AuthenticationResult?.AccessToken ?? "",
    idToken: result.AuthenticationResult?.IdToken ?? "",
  } as AuthenticatedUser;
};

export const Cognito = { login, logOut, signUp, verify, refreshTokens };
