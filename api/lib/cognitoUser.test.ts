import { cognitoUserInfo } from "./cognitoUser"
import { data } from "./fixtures/adminListGroupsForUser"

describe("cognitoUser", () => {
  test("should return a cognito user's info", async () => {
    const cognitoIdentityServiceProvider =
      "cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxxxxxx,cognito-idp.us-east-1.amazonaws.com/us-east-1_aaaaaaaaa:CognitoSignIn:qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr"

    const cognitoIdentityServiceProviderMock = {
      adminListGroupsForUser() {
        return {
          promise() {
            return Promise.resolve(data)
          },
        }
      },
    }

    const res = await cognitoUserInfo(cognitoIdentityServiceProvider, cognitoIdentityServiceProviderMock)
    // console.log(res)
    expect(res.userPoolUserId).toBe("qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr")
    expect(res.cognitoGroups.length).toEqual(2)
    expect(res.cognitoGroups).toContain("auditor")
    expect(res.cognitoGroups).toContain("user")
  })
})
