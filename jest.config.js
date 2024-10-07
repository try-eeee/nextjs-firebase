import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  clearMocks: true,
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/__tests__/**/*.test.{js,ts,jsx,tsx}"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(config);
