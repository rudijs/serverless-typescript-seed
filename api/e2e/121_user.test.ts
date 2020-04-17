import Amplify, { Auth, API } from "aws-amplify"
import fetch from "node-fetch"

// aws-amplify uses fetch in the browser, to make it work in node polyfill the global fetch using node-fetch
global["fetch"] = fetch

describe("amplify", () => {
  test("should", async () => {
    Amplify.configure({
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
            // endpoint: "https://yc609d159e.execute-api.ap-southeast-1.amazonaws.com/dev",
            // region: "ap-southeast-1"
          },
        ],
      },
    })
    try {
      await Auth.signIn("admin@example.com", process.env.AWS_APP_ADMIN_PASSWORD)

      // const currentUserInfo = await Auth.currentUserInfo();
      // console.log(101, currentUserInfo);

      // const currentSession = await Auth.currentSession()
      // console.log(currentSession)
      const users = await API.get("notes", "/user", {})
      console.log(users)
      expect(true).toBeTruthy()
    } catch (e) {
      if (e.response.data) {
        console.log("e.response.data", e.response.data)
      } else {
        console.log("e", e)
      }
    }
  })
})
