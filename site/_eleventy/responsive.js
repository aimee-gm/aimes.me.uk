const { html } = require("common-tags");
const path = require("path");

const resize = (src, width) =>
  new URL(
    path.join(`/aimes/image/upload/w_${width}%2Cq_auto/`, "images", src),
    "https://res.cloudinary.com"
  ).toString();

const fallback = (src) =>
  new URL(path.join("images", src), "https://media.aimes.me.uk/").toString();

const getSrc = (el) => {
  const src = /src="([^"]+)"/.exec(el);

  if (src && src.length) {
    return src[1];
  }

  throw new Error(`Cannot find image src attribute in ${el}`);
};

const responsivePicture = (el) => {
  const src = getSrc(el);
  const fallbackUrl = fallback(src);

  return html` <picture>
    <source
      media="(min-width: 1024px)"
      srcset="${resize(src, 824 * 2)} 2x, ${resize(src, 824)} 1x"
    />
    <source
      media="(min-width: 768px)"
      srcset="${resize(src, 696 * 2)} 2x, ${resize(src, 696)} 1x"
    />
    <source
      media="(min-width: 420px)"
      srcset="${resize(src, 568 * 2)} 2x, ${resize(src, 568)} 1x"
    />
    <source srcset="${resize(src, 348 * 2)} 2x, ${resize(src, 348)} 1x" />
    ${el.replace(src, fallbackUrl)}
  </picture>`;
};

module.exports = {
  configFunction: function (eleventyConfig) {
    eleventyConfig.addPairedShortcode(`responsivePicture`, responsivePicture);
    eleventyConfig.addShortcode("resize", resize);
    eleventyConfig.addShortcode("fallback", fallback);
  },
};
