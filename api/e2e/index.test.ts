import { pingTest } from "./100_ping"
import { setupCredentials } from "./110_setup"
import { userTests } from "./120_user"

describe("ping", pingTest)
describe("setup credentials", setupCredentials)
describe("user tests", userTests)
