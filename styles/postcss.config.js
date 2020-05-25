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
    importFrom: "./src/includes/media.pcss",
  }),
];

module.exports = {
  plugins,
};
