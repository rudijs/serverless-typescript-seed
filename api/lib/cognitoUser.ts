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
  // Cognito authentication provider looks like:
  // cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxxxxxx,cognito-idp.us-east-1.amazonaws.com/us-east-1_aaaaaaaaa:CognitoSignIn:qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr
  // Where us-east-1_aaaaaaaaa is the User Pool id
  // And qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr is the User Pool User Id

  // cognitoAuthenticationProvider cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_bBEEUWPbr,cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_bBEEUWPbr:CognitoSignIn:da9e8459-7ed3-42f2-9646-57b373cdd192
  const parts = cognitoAuthenticationProvider.split(":")

  const userPoolIdParts = parts[parts.length - 3].split("/")

  const userPoolId = userPoolIdParts[userPoolIdParts.length - 1]
  // Ex: userPoolId ap-southeast-1_bBEEUWPbr

  const userPoolUserId = parts[parts.length - 1]
  // Ex: userPoolUserId da9e8459-7ed3-42f2-9646-57b373cdd192

  // user details
  const params = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: userPoolUserId,
  }

  const userData = await cognitoIdentityServiceProvider.adminGetUser(params).promise()
  // console.log("userData", userData)

  // filter out UserAttributes
  const userAttributes = {}
  userData.UserAttributes.forEach((item) => {
    userAttributes[item.Name] = item.Value
    // convert String "true" or "false" to a Boolean
    if (item.Name === "email_verified") {
      userAttributes[item.Name] = item.Value === "true"
    }
  })
  // console.log(userAttributes)

  const groupData = await cognitoIdentityServiceProvider
    .adminListGroupsForUser({
      UserPoolId: userPoolId,
      Username: userPoolUserId,
    })
    .promise()

  // console.log("adminListGroupsForUser", groupData)

  return { userPoolUserId, userAttributes, cognitoGroups: groupFilter(groupData) }
}
