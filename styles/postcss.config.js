const customMedia = require("postcss-custom-media");

const plugins = [
  require("postcss-import"),
  require("postcss-nested"),
  require("postcss-preset-env"),
  require("postcss-custom-properties")({
    preserve: false,
  }),
  require("cssnano"),
  customMedia({
    importFrom: "./src/media.pcss",
  }),
];

if (process.env.CI || process.env.NETLIFY) {
  plugins.push(require("cssnano"));
}

module.exports = {
  plugins,
};
