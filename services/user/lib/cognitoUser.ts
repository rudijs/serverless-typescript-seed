import { groupFilter } from "./groupFilter"

interface ICognitoIdentityServiceProvider {
  adminGetUser({}: {
    UserPoolId: string
    Username: string
  }): {
    promise(): Promise<any>
  }

  adminListGroupsForUser({}: {
    UserPoolId: string
    Username: string
  }): {
    promise(): Promise<any>
  }
}

export const cognitoUserInfo = async (
  cognitoAuthenticationProvider: string,
  cognitoIdentityServiceProvider: ICognitoIdentityServiceProvider
): Promise<{ userPoolUserId: string; userAttributes: any; cognitoGroups: string[] }> => {
  // ): Promise<any> => {
  // validate cognitoAuthenticationProvider format
  // Cognito authentication provider looks like either of these:
  // 1) cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxxxxxx,cognito-idp.us-east-1.amazonaws.com/us-east-1_aaaaaaaaa:CognitoSignIn:qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr
  // 2) cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_xxxxxxx,cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_aaaaaaaa:CognitoSignIn:qqqq-1111-2222-3333-rrrr,cognito-identity-aws-account-id:123456789
  // Where ap-southeast-1_aaaaaaaa is the User Pool id
  // And qqqq-1111-2222-3333-rrrr is the User Pool User Id
  // console.log(cognitoAuthenticationProvider)

  const regex = new RegExp("cognito-idp..*.amazonaws.com/.*,cognito-idp..*.amazonaws.com/.*:CognitoSignIn:.*")
  const test = regex.test(cognitoAuthenticationProvider)
  if (!test) {
    throw new Error(`Invalid format cognitoAuthenticationProvider: ${cognitoAuthenticationProvider}`)
  }

  const parts = cognitoAuthenticationProvider.split(",")

  const userPoolId = parts[0].split("/")[1]

  const userPoolUserId = parts[1].split(":")[2]

  // user details
  const params = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: userPoolUserId,
  }

  const userData = await cognitoIdentityServiceProvider.adminGetUser(params).promise()

  // filter out UserAttributes
  const userAttributes = {}
  userData.UserAttributes.forEach((item) => {
    userAttributes[item.Name] = item.Value
    // convert String "true" or "false" to a Boolean
    if (item.Name === "email_verified") {
      userAttributes[item.Name] = item.Value === "true"
    }
  })

  const groupData = await cognitoIdentityServiceProvider
    .adminListGroupsForUser({
      UserPoolId: userPoolId,
      Username: userPoolUserId,
    })
    .promise()

  return { userPoolUserId, userAttributes, cognitoGroups: groupFilter(groupData) }
}
