module.exports = {
  extends: ["eslint:recommended"],
  env: { node: true, es2017: true },
  rules: {
    "arrow-body-style": ["error", "as-needed"],
  },
  overrides: [
    {
      files: "./test/**/*.test.js",
      env: { mocha: true },
    },
  ],
};
