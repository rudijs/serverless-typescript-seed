import { cognitoUserInfo } from "./cognitoUser"
import { data as groupData } from "./fixtures/adminListGroupsForUser"
import { data as userData } from "./fixtures/adminGetUser"

describe("cognitoUser", () => {
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

  test("should return a cognito user's info", async () => {
    const cognitoIdentityServiceProvider =
      "cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_xxxxxxx,cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_aaaaaaaa:CognitoSignIn:qqqq-1111-2222-3333-rrrr,cognito-identity-aws-account-id:123456789"

    const res = await cognitoUserInfo(cognitoIdentityServiceProvider, cognitoIdentityServiceProviderMock)
    // console.log(res)
    expect(res.userPoolUserId).toBe("qqqq-1111-2222-3333-rrrr")
    expect(res.userAttributes.email).toBe("admin@example.com")
    expect(res.cognitoGroups.length).toEqual(2)
    expect(res.cognitoGroups).toContain("auditor")
    expect(res.cognitoGroups).toContain("user")
  })

  test("should reject invalid input cognitoAuthenticationProvider format", async () => {
    const cognitoIdentityServiceProvider = "bad-format-cognitoIdentityServiceProvider"

    try {
      await cognitoUserInfo(cognitoIdentityServiceProvider, cognitoIdentityServiceProviderMock)
    } catch (e) {
      expect(e.message).toMatch(/Invalid format cognitoAuthenticationProvider/)
    }
  })
})
