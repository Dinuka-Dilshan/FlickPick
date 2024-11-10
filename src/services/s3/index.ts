import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const COGNITO_ID = `cognito-idp.${
  import.meta.env.VITE_AWS_REGION
}.amazonaws.com/${import.meta.env.VITE_COGNITO_USER_POOL_ID}`;

export const getPopularMoviesTvs = async (idToken: string) => {
  const client = new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: fromCognitoIdentityPool({
      clientConfig: { region: import.meta.env.VITE_AWS_REGION },
      identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
      logins: {
        [COGNITO_ID]: idToken,
      },
    }),
  });

  const movies = await client.send(
    new GetObjectCommand({
      Bucket: import.meta.env.VITE_S3BUCKET,
      Key: `popular-movies.json`,
      ResponseCacheControl: "no-store",
      IfNoneMatch: `"${Date.now()}"`,
    })
  );

  const tvs = await client.send(
    new GetObjectCommand({
      Bucket: import.meta.env.VITE_S3BUCKET,
      Key: `popular-tvs.json`,
      ResponseCacheControl: "no-store",
      IfNoneMatch: `"${Date.now()}"`,
    })
  );

  const moviesJson = await movies.Body.transformToString();
  const tvsJson = await tvs.Body.transformToString();

  return { movies: JSON.parse(moviesJson), tvs: JSON.parse(tvsJson) };
};
