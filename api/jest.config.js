module.exports = {
  roots: ["<rootDir>/lib"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["lib/**/*.{ts,tsx}"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    "./lib/sigV4Client.ts": {
      branches: 62,
    },
  },
  coverageReporters: ["json", "lcov", "text", "clover"],
}
