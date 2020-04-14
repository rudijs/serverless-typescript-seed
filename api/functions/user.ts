import { APIGatewayProxyHandler } from "aws-lambda"
import "source-map-support/register"
import * as AWS from "aws-sdk"
import { success, failure } from "../lib/response"

export const main: APIGatewayProxyHandler = async (event, _context) => {
  AWS.config.region = process.env.REGION

  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider()

  try {
    // single user
    if (event.pathParameters && event.pathParameters.userName) {
      const { userName } = event.pathParameters

      const params = {
        UserPoolId: process.env.USER_POOL_ID,
        Username: userName,
      }

      const res = await cognitoidentityserviceprovider.adminGetUser(params).promise()
      // eslint-disable-next-line no-console
      // console.log(res)

      return success(res)
    }

    // all users
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      AttributesToGet: ["sub", "email"],
    }

    const res = await cognitoidentityserviceprovider.listUsers(params).promise()

    return success(res.Users)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("err", e)
    return failure({ message: e.message })
  }
}
