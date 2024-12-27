import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  GetUserCommand,
  InitiateAuthCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { AuthenticatedUser } from "../../types/user";

export type CognitoLoginProps = {
  userName: string;
  passWord: string;
  googleAuthCode: string;
};

export type CognitoSignupProps = {
  email: string;
  password: string;
  fullname: string;
};

export type CognitoVerifyProps = { userName: string; otp: string };

export type CognitoUserAttributes = {
  name: string;
  email: string;
  picture: string;
};

const client = new CognitoIdentityProviderClient({
  region: import.meta.env.VITE_COGNITO_CLIENT_REGION,
});

const login = async ({
  passWord,
  userName,
  googleAuthCode,
}: CognitoLoginProps) => {
  let accessToken = "";
  let expiresIn = 0;
  let idToken = "";
  let refreshToken = "";

  if (googleAuthCode) {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", import.meta.env.VITE_COGNITO_CLIENT_ID);
    params.append("code", googleAuthCode);
    params.append("redirect_uri", import.meta.env.VITE_AUTH_REDIRECT_URL);

    params.toString();

    const result = await fetch(
      `${import.meta.env.VITE_COGNITO_DOMAIN}/oauth2/token`,
      {
        method: "POST",
        body: params.toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!result.ok) {
      throw new Error("unable to access google");
    }

    const data = (await result.json()) as {
      access_token: string;
      id_token: string;
      refresh_token: string;
      expires_in: 3600;
      token_type: string;
    };

    accessToken = data.access_token;
    expiresIn = data.expires_in;
    idToken = data.id_token;
    refreshToken = data.refresh_token;
  } else {
    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
      AuthParameters: { USERNAME: userName, PASSWORD: passWord },
    });

    const result = await client.send(command);
    accessToken = result.AuthenticationResult?.AccessToken as string;
    expiresIn = result.AuthenticationResult?.ExpiresIn as number;
    idToken = result.AuthenticationResult?.IdToken as string;
    refreshToken = result.AuthenticationResult?.RefreshToken as string;
  }

  const user = await client.send(
    new GetUserCommand({
      AccessToken: accessToken,
    })
  );

  const userData = user.UserAttributes?.reduce(
    (userData, curr) =>
      curr?.Name ? { [curr?.Name]: curr.Value, ...userData } : userData,
    {} as CognitoUserAttributes
  );

  const accessTokenExpiresOn =
    new Date(
      Date.now() + (expiresIn ?? 0) * 1000 // cognito set to 1 hour
    ).getTime() ?? 0;

  const refreshTokenExpiresOn = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 29
  ).getTime(); // cognito set to 30 days but we use 29 days here ):

  return {
    accessToken: accessToken ?? "",
    email: userData?.email ?? "",
    accessTokenExpiresOn,
    idToken: idToken ?? "",
    name: userData?.name ?? "",
    refreshToken: refreshToken ?? "",
    refreshTokenExpiresOn: refreshTokenExpiresOn,
    picture: userData?.picture ?? "",
    isGoogleUser: !!googleAuthCode,
  } as AuthenticatedUser;
};

const logOut = async () => {
  // if (true) {
  //   await client.send(
  //     new GlobalSignOutCommand({ AccessToken: user.accessToken })
  //   );
  // }
  const logoutUrl = `${import.meta.env.VITE_COGNITO_DOMAIN}/logout?client_id=${
    import.meta.env.VITE_COGNITO_CLIENT_ID
  }&logout_uri=${import.meta.env.VITE_AUTH_REDIRECT_URL}`;

  window.location.href = logoutUrl;
};

const signUp = async ({ password, email, fullname }: CognitoSignupProps) => {
  const command = new SignUpCommand({
    ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: "name", Value: email },
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

export const Cognito = {
  login,
  logOut,
  signUp,
  verify,
  refreshTokens,
};
