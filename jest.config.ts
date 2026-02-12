import type { JestConfigWithTsJest } from "ts-jest";

const jestUnitConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/test/**/*.spec.ts"],
  collectCoverage: true,
  coverageDirectory: "./coverage",
  collectCoverageFrom: ["./src/utils/*.ts"],
  coverageReporters: ["text", "json-summary"],
};

export default jestUnitConfig;
