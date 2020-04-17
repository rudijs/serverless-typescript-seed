import { APIGatewayProxyHandler } from "aws-lambda"
import "source-map-support/register"
import * as AWS from "aws-sdk"
import { success, failure } from "../lib/response"
import { unescape } from "querystring"
import { cognitoGroups } from "../lib/groups"
import { rbac } from "../lib/rbac"
import { PermissionError } from "../lib/errors"

export const main: APIGatewayProxyHandler = async (event, _context) => {
  AWS.config.region = process.env.REGION

  try {
    // 1st get the cognito groups for the requesting user
    const authProvider = event.requestContext.identity.cognitoAuthenticationProvider
    const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider()
    const requestUserGroups = await cognitoGroups(authProvider, cognitoIdentityServiceProvider)
    console.log("requestUserGroups", requestUserGroups)

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

    const allow = await rbac.can(requestUserGroups, "cognito-idp:ListUsers")
    if (!allow) throw new PermissionError("Permission denied for this action")

    // list all users
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      AttributesToGet: ["sub", "email"],
    }

    const res = await cognitoIdentityServiceProvider.listUsers(params).promise()

    return success(res.Users)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("err", e)

    let status = 500
    if (e.code) {
      status = e.code
    }
    return failure([{ status, title: e.message, description: "Application error" }], status)
  }
}
