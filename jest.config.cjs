module.exports = {
  collectCoverage: false, // See package.json script
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,js,vue}",
    "!<rootDir>/node_modules/",
  ],
  coverageReporters: ["text", "cobertura"],
  moduleFileExtensions: ["js", "ts", "tsx", "json"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  rootDir: "src",
  setupFiles: ["<rootDir>/../jest/setup/il8n.js"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
};
