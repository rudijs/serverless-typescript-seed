import { types } from "mobx-state-tree"

const State = types
  .model("State", { group: types.string })
  .actions((self) => ({
    setGroup(name: string) {
      self.group = name
    },
    signOut() {
      self.group = "guest"
    },
  }))
  .views((self) => ({
    get isAuthenticated() {
      return self.group !== "guest"
    },
    get groups() {
      return self.group
    },
  }))

export const appState = State.create({ group: "guest" })
