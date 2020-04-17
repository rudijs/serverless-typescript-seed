import RBAC from "easy-rbac"

const opts = {
  user: {
    // Role name
    can: [
      // list of allowed operations
      "account",
      "post:add",
      {
        name: "post:save",
        when: async (params) => params.userId === params.ownerId,
      },
      "user:create",
      {
        name: "user:*",
        when: async (params) => params.id === params.userId,
      },
    ],
  },
  manager: {
    inherits: ["user"],
    can: ["post:save", "post:delete", "account:*"],
  },
  admin: {
    inherits: ["manager"],
    can: ["cognito-idp:ListUsers"],
  },
}

export const rbac = RBAC.create(opts)
