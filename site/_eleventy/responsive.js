const { html } = require("common-tags");

const resize = (src, width) => `${src}?nf_resize=fit&w=${width}`;

const getSrc = (el) => {
  const src = /src="([^"]+)"/.exec(el);

  if (src && src.length) {
    return src[1];
  }

  throw new Error(`Cannot find image src attribute in ${el}`);
};

const responsivePicture = (el) => {
  const src = getSrc(el);
  const fallback = resize(src, 824);

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
    ${el.replace(src, fallback)}
  </picture>`;
};

module.exports = {
  configFunction: function (eleventyConfig) {
    eleventyConfig.addPairedShortcode(`responsivePicture`, responsivePicture);
    eleventyConfig.addShortcode("resize", resize);
  },
};
