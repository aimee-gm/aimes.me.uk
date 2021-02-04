const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const yaml = require("js-yaml");
const markdownIt = require("markdown-it");
const path = require("path");
const eleventyReadMorePlugin = require("eleventy-plugin-read-more");
const responsivePlugin = require("eleventy-plugin-responsive-picture");

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
  eleventyConfig.addPlugin(responsivePlugin, {
    ratios: [2, 1],
    sources: [
      { media: "(min-width: 1024px)", size: 824 },
      { media: "(min-width: 768px)", size: 696 },
      { media: "(min-width: 420px)", size: 568 },
      { size: 348 },
    ],
    resize: (src, size) =>
      new URL(
        path.join(
          "/aimes/image/upload/",
          src.includes("jpg") ? `w_${size}%2Cq_auto` : `w_${size}`,
          "images",
          src
        ),
        "https://res.cloudinary.com"
      ).toString(),
    fallback: (src) =>
      new URL(
        path.join("images", src),
        "https://media.aimes.me.uk/"
      ).toString(),
  });

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

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
