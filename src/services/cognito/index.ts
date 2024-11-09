import {
  CognitoIdentityProviderClient,
  GetUserCommand,
  GlobalSignOutCommand,
  InitiateAuthCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { AuthenticatedUser } from "../../types/user";

const client = new CognitoIdentityProviderClient({
  region: import.meta.env.VITE_COGNITO_CLIENT_REGION,
});

const login = async ({
  password,
  username,
}: {
  username: string;
  password: string;
}) => {
  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    AuthParameters: { USERNAME: username, PASSWORD: password },
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
    {}
  );

  return {
    accessToken: result.AuthenticationResult?.AccessToken ?? "",
    birthday: userData?.birthdate ?? "",
    email: userData?.email ?? "",
    expiresIn: result.AuthenticationResult?.ExpiresIn ?? 0,
    gender: userData?.gender ?? "",
    idToken: result.AuthenticationResult?.IdToken ?? "",
    name: userData?.name ?? "",
    refreshToken: result.AuthenticationResult?.RefreshToken ?? "",
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
}: {
  email: string;
  password: string;
  birthdate: string;
  gender: string;
  fullname: string;
}) => {
  const command = new SignUpCommand({
    ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "birthdate", Value: birthdate },
      { Name: "gender", Value: gender },
      { Name: "fullname", Value: fullname },
    ],
  });

  const result = await client.send(command);

  return result;
};

export const Cognito = { login, logOut, signUp };
