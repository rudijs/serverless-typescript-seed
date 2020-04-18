import { cognitoUserInfo } from "./cognitoUser"
import { data as groupData } from "./fixtures/adminListGroupsForUser"
import { data as userData } from "./fixtures/adminGetUser"

describe("cognitoUser", () => {
  test("should return a cognito user's info", async () => {
    const cognitoIdentityServiceProvider =
      "cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxxxxxx,cognito-idp.us-east-1.amazonaws.com/us-east-1_aaaaaaaaa:CognitoSignIn:qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr"

    const cognitoIdentityServiceProviderMock = {
      adminGetUser() {
        return {
          promise() {
            return Promise.resolve(userData)
          },
        }
      },
      adminListGroupsForUser() {
        return {
          promise() {
            return Promise.resolve(groupData)
          },
        }
      },
    }

    const res = await cognitoUserInfo(cognitoIdentityServiceProvider, cognitoIdentityServiceProviderMock)
    // console.log(res)
    expect(res.userPoolUserId).toBe("qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr")
    expect(res.userAttributes.email).toBe("admin@example.com")
    expect(res.cognitoGroups.length).toEqual(2)
    expect(res.cognitoGroups).toContain("auditor")
    expect(res.cognitoGroups).toContain("user")
  })
})
