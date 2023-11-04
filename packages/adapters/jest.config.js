module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["./src/**"],
  moduleNameMapper: {
    "@ichtus/breakfeastwheel-domain": "<rootDir>/../domain/src",
    "@ichtus/breakfeastwheel-adapters": "<rootDir>/src",
  },
};
