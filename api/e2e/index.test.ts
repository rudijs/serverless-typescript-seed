import { pingTest } from "./100_ping"
import { configureAmplify } from "./110_setup"
import { userTests } from "./120_user"

describe("ping", pingTest)
describe("setup configure Amplify", configureAmplify)
describe("user", userTests)
