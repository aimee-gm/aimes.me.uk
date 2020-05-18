const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const yaml = require("js-yaml");
const markdownIt = require("markdown-it");

const eleventyReadMorePlugin = require("eleventy-plugin-read-more");
const responsivePlugin = require("./_eleventy/responsive");
const shortcodes = require("./_eleventy/shortcodes");
const transforms = require("./_eleventy/transforms");
const filters = require("./_eleventy/filters");

const mdLibrary = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
}).use(require("markdown-it-anchor"));

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventyReadMorePlugin);
  eleventyConfig.addPlugin(responsivePlugin);

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addDataExtension("yaml", (contents) =>
    yaml.safeLoad(contents)
  );

  eleventyConfig.setLibrary("md", mdLibrary);

  Object.keys(shortcodes).forEach((key) =>
    eleventyConfig.addShortcode(key, shortcodes[key])
  );

  Object.keys(filters).forEach((key) =>
    eleventyConfig.addFilter(key, filters[key])
  );

  Object.keys(transforms).forEach((key) =>
    eleventyConfig.addTransform(key, transforms[key])
  );

  return {
    dir: {
      input: "./",
      data: "./_data",
      output: "../dist",
      layouts: "./_layouts",
      includes: "./_includes",
    },
  };
};
