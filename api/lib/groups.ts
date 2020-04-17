import { groupFilter } from "./groupFilter"

interface ICognitoIdentityServiceProvider {
  adminListGroupsForUser({}: {
    UserPoolId: string
    Username: string
  }): {
    promise(): Promise<any>
  }
}

export const cognitoGroups = async (cognitoAuthenticationProvider: string, cognitoIdentityServiceProvider: ICognitoIdentityServiceProvider): Promise<any> => {
  // Cognito authentication provider looks like:
  // cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxxxxxx,cognito-idp.us-east-1.amazonaws.com/us-east-1_aaaaaaaaa:CognitoSignIn:qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr
  // Where us-east-1_aaaaaaaaa is the User Pool id
  // And qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr is the User Pool User Id

  // cognitoAuthenticationProvider cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_bBEEUWPbr,cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_bBEEUWPbr:CognitoSignIn:da9e8459-7ed3-42f2-9646-57b373cdd192
  const parts = cognitoAuthenticationProvider.split(":")

  const userPoolIdParts = parts[parts.length - 3].split("/")

  const userPoolId = userPoolIdParts[userPoolIdParts.length - 1]

  const userPoolUserId = parts[parts.length - 1]

  console.log("userPoolId", userPoolId)
  // Ex: userPoolId ap-southeast-1_bBEEUWPbr
  console.log("userPoolUserId", userPoolUserId)
  // Ex: userPoolUserId da9e8459-7ed3-42f2-9646-57b373cdd192

  const data = await cognitoIdentityServiceProvider
    .adminListGroupsForUser({
      UserPoolId: userPoolId,
      Username: userPoolUserId,
    })
    .promise()

  console.log("adminListGroupsForUser", data)

  return groupFilter(data)
}
