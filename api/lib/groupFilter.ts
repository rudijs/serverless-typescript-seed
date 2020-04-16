export type cognitoGroup = {
  GroupName: string
  UserPoolId: string
  Description: string
  Precedence: number
  LastModifiedDate: string
  CreationDate: string
}

export type cognitoGroupList = { Groups: cognitoGroup[] }

export const groupFilter = (data: cognitoGroupList): string[] => {
  return data.Groups.map((item) => {
    return item.GroupName
  }).sort()
}
