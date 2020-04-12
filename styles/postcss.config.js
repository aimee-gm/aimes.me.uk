const plugins = [
  require("postcss-import"),
  require("tailwindcss"),
  require("postcss-nested"),
  require("postcss-preset-env"),
  require("cssnano"),
];

if (process.env.CI || process.env.NETLIFY) {
  plugins.push(require("cssnano"));
  plugins.push(
    require("@fullhuman/postcss-purgecss")({
      content: ["../dist/**/*.html"],
    })
  );
}

module.exports = {
  plugins,
};
