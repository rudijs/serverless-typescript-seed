import Amplify from "aws-amplify"
import fetch from "node-fetch"

// aws-amplify uses fetch in the browser, to make it work in node polyfill the global fetch using node-fetch
global["fetch"] = fetch

const requiredEnvVars = [
  "AWS_APP_COGNITO_REGION",
  "AWS_APP_COGNITO_USER_POOL_ID",
  "AWS_APP_COGNITO_IDENTITY_POOL_ID",
  "AWS_APP_COGNITO_APP_CLIENT_ID",
  "AWS_APP_SERVICE_ENDPOINT",
  "AWS_APP_ADMIN_PASSWORD",
]

// exit if any of the required env vars are missing
for (let i = 0; i < requiredEnvVars.length; i++) {
  if (!process.env[requiredEnvVars[i]]) throw `Missing required env var: ${requiredEnvVars[i]}`
}

export const setupCredentials = () => {
  test("should configure AWS Amplify credentials for the following tests", async () => {
    const config = {
      Auth: {
        mandatorySignIn: true,
        region: process.env.AWS_APP_COGNITO_REGION,
        userPoolId: process.env.AWS_APP_COGNITO_USER_POOL_ID,
        identityPoolId: process.env.AWS_APP_COGNITO_IDENTITY_POOL_ID,
        userPoolWebClientId: process.env.AWS_APP_COGNITO_APP_CLIENT_ID,
      },
      API: {
        endpoints: [
          {
            name: "notes",
            region: process.env.AWS_APP_COGNITO_REGION,
            endpoint: process.env.AWS_APP_SERVICE_ENDPOINT,
          },
        ],
      },
    }

    Amplify.configure(config)
  })
}
