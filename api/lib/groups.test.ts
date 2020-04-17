import { cognitoGroups } from "./groups"
import { data } from "./fixtures/adminListGroupsForUser"

describe("groups", () => {
  test("should", async () => {
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

    const res = await cognitoGroups(cognitoIdentityServiceProvider, cognitoIdentityServiceProviderMock)
    // console.log(res)
    expect(res.length).toEqual(2)
    expect(res).toContain("auditor")
    expect(res).toContain("user")
  })
})
