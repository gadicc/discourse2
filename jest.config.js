module.exports = {
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/lib/", "<rootDir>/node_modules/"],
  coverageReporters: ["text", "json-summary"],
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
};
