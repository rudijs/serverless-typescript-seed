import { APIGatewayProxyHandler } from "aws-lambda"
import "source-map-support/register"
import * as AWS from "aws-sdk"
import { success, failure } from "../lib/response"
import { unescape } from "querystring"

export const main: APIGatewayProxyHandler = async (event, _context) => {
  AWS.config.region = process.env.REGION

  const authProvider = event.requestContext.identity.cognitoAuthenticationProvider
  // console.log("authProvider", authProvider)
  // Cognito authentication provider looks like:
  // cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxxxxxx,cognito-idp.us-east-1.amazonaws.com/us-east-1_aaaaaaaaa:CognitoSignIn:qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr
  // Where us-east-1_aaaaaaaaa is the User Pool id
  // And qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr is the User Pool User Id

  const parts = authProvider.split(":")
  const userPoolIdParts = parts[parts.length - 3].split("/")

  const userPoolId = userPoolIdParts[userPoolIdParts.length - 1]
  const userPoolUserId = parts[parts.length - 1]
  console.log("userPoolId", userPoolId)
  console.log("userPoolUserId", userPoolUserId)

  const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider()

  try {
    const data = await cognitoIdentityServiceProvider
      .adminListGroupsForUser({
        UserPoolId: userPoolId,
        Username: userPoolUserId,
      })
      .promise()

    console.log("adminListGroupsForUser", data)

    // const groups = groupFilter(data)
    // console.log("groups", groups)

    // single user
    if (event.pathParameters && event.pathParameters.userName) {
      const { userName } = event.pathParameters

      const params = {
        UserPoolId: process.env.USER_POOL_ID,
        Username: unescape(userName),
      }

      const res = await cognitoIdentityServiceProvider.adminGetUser(params).promise()
      // eslint-disable-next-line no-console
      // console.log(res)

      return success(res)
    }

    // all users
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      AttributesToGet: ["sub", "email"],
    }

    const res = await cognitoIdentityServiceProvider.listUsers(params).promise()

    return success(res.Users)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("err", e)
    return failure([{ status: 500, title: e.message, description: "Did not work" }])
  }
}
