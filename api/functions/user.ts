import { APIGatewayProxyHandler } from "aws-lambda"
import "source-map-support/register"
import * as AWS from "aws-sdk"
import { success, failure } from "../lib/response"
import { unescape } from "querystring"
import { cognitoUserInfo } from "../lib/cognitoUser"
import { rbac } from "../lib/rbac"
import { PermissionError } from "../lib/errors"

export const main: APIGatewayProxyHandler = async (event, _context) => {
  AWS.config.region = process.env.REGION

  try {
    // 1st get the cognito groups for the requesting user
    const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider()
    // console.log("api cognitoAuthenticationProvider", event.requestContext.identity.cognitoAuthenticationProvider)
    const authProvider = event.requestContext.identity.cognitoAuthenticationProvider
    const { userAttributes, cognitoGroups } = await cognitoUserInfo(authProvider, cognitoIdentityServiceProvider)
    // console.log("userPoolUserId", userPoolUserId)
    // console.log("userAttributes", userAttributes)
    // console.log("requestUserGroups", cognitoGroups)

    // single user
    if (event.pathParameters && event.pathParameters.userName) {
      // the username to lookup in the cognito user pool database
      const { userName } = event.pathParameters
      // console.log("user owner profile", unescape(userName))
      // todo:rudijs validate the userName iput
      // todo:rudijs check for username format which can be either email or uuid format

      // check the requesting user is allowed to read this profile
      // users can read only their own profile, admin can read any profile
      const canAdminGetUser = await rbac.can(cognitoGroups, "cognito-idp:AdminGetUser", { userName: userAttributes.email, ownerUserName: userName })
      // console.log("canAdminGetUser", canAdminGetUser)
      if (!canAdminGetUser) throw new PermissionError("Permission denied for this action: AdminGetUser")

      const params = {
        UserPoolId: process.env.USER_POOL_ID,
        Username: unescape(userName),
      }

      const res = await cognitoIdentityServiceProvider.adminGetUser(params).promise()
      // eslint-disable-next-line no-console
      // console.log(res)

      return success(res)
    }

    const canListUsers = await rbac.can(cognitoGroups, "cognito-idp:ListUsers")
    if (!canListUsers) throw new PermissionError("Permission denied for this action: ListUsers")

    // list all users
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      AttributesToGet: ["sub", "email"],
    }

    const res = await cognitoIdentityServiceProvider.listUsers(params).promise()

    return success(res.Users)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)

    let status = 500

    if (e.code) {
      status = e.code
    }

    return failure([{ status, title: e.message, description: "Application error" }], status)
  }
}
