const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const yaml = require("js-yaml");

const shortcodes = require("./_eleventy/shortcodes");
const transforms = require("./_eleventy/transforms");
const filters = require("./_eleventy/filters");

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));

  Object.keys(shortcodes).forEach(key =>
    eleventyConfig.addShortcode(key, shortcodes[key])
  );

  Object.keys(filters).forEach(key =>
    eleventyConfig.addFilter(key, filters[key])
  );

  Object.keys(transforms).forEach(key =>
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
