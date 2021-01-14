module.exports = {
  /**
   * This is the list of custom rules we define.
   * This listing DOES NOT activate any rules, simply makes them available for the configs below.
   */
  rules: {
    "no-relative-imports": require("./rules/no-relative-imports"),
  },
  configs: {
    /**
     * This is the baseline config for all our TypeScript-based projects.
     */
    baseline: {
      plugins: [
        "@typescript-eslint", // add TypeScript-specific rules
        "prettier", // add Prettier as plugin, so we can use it via ESLint
        "jest",
        "security",
      ],
      extends: [
        "eslint:recommended", // start from the default ESLint config
        "plugin:@typescript-eslint/recommended", // add TypeScript-specific default config
        "prettier/@typescript-eslint", // disable TypeScript rules that would clash with how Prettier does formatting
        "plugin:prettier/recommended", // disable JavaScript rules that would clash with how Prettier does formatting
        "plugin:jest/recommended",
        "plugin:security/recommended",
      ],
      env: {
        jest: true,
        es6: true,
      },
      rules: {
        "prettier/prettier": [
          "warn",
          {
            singleQuote: true,
            semi: false,
            tabWidth: 2,
            trailingComma: "none",
            arrowParens: "avoid",
          },
        ],
        "swarmia-dev/no-relative-imports": "error",
        "@typescript-eslint/no-shadow": "warn",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-submodule-imports": 0,
        "@typescript-eslint/no-non-null-assertion": 0,
        "@typescript-eslint/no-use-before-define": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/ban-ts-ignore": 0,
        "@typescript-eslint/ban-ts-comment": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            varsIgnorePattern: "^_",
            argsIgnorePattern: "^_",
          },
        ],
        "no-console": "warn",
        "no-debugger": "warn",
        "jest/no-focused-tests": "warn",
        "security/detect-non-literal-fs-filename": 0, // produces a lot of false positives
        "security/detect-object-injection": 0, // discussed in: https://github.com/swarmia/hook/pull/99#discussion_r553338159
        curly: ["warn", "multi-line"],
        "no-throw-literal": "error",
        "object-shorthand": "warn",
      },
      parser: "@typescript-eslint/parser",
    },

    /**
     * Use this config for node projects.
     */
    node: {
      extends: [
        "plugin:swarmia-dev/baseline", // start from our baseline config
      ],
      env: {
        node: true,
      },
      rules: {
        // These could also be promoted to baseline, but we already seem to follow these rules without too much pain for "react" projects:
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/ban-types": 0,
      },
    },

    /**
     * Use this config for React projects.
     */
    react: {
      plugins: [
        "react", // add React-specific rules
        "react-hooks", // add rules that help follow https://reactjs.org/docs/hooks-rules.html
      ],
      extends: [
        "plugin:swarmia-dev/baseline", // start from our baseline config
        "plugin:react/recommended", // add React defaults
      ],
      env: {
        browser: true,
      },
      rules: {
        "react/self-closing-comp": "warn",
        "react/prop-types": 0,
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
      },
      settings: {
        react: {
          pragma: "React",
          version: "detect",
        },
      },
    },
  },
};
