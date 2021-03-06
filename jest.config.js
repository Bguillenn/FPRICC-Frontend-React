/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
/** @type {import('jsdom/index.d.ts')} */

const {pathsToModuleNameMapper} = require("ts-jest");
const {compilerOptions} = require("./tsconfig");

compilerOptions.target = "esnext";

module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",

    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ["<rootDir>/src"],

    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.svg$": "jest-transform-stub",
    },

    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    setupFilesAfterEnv: [
        // "@testing-library/react/cleanup-after-each",
        "@testing-library/jest-dom/extend-expect",
    ],

    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

    // Module file extensions for importing
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: "<rootDir>/"}),

    modulePathIgnorePatterns: ["<rootDir>/src/assets/"],
};
