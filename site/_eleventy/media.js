const { html } = require("common-tags");

const mediaQueriesToWidths = (type) =>
  mediaQueries[type]
    .reduce((srcset, { width }) => {
      if (!width.includes("px")) {
        return srcset;
      }

      const pixels = parseInt(width.replace("px"));

      return [...srcset, pixels, pixels * 2];
    }, [])
    .sort((a, b) => a - b);

const mediaQueriesToSizes = (type) =>
  mediaQueries[type]
    .map(({ width, mediaQuery }) => {
      if (!mediaQuery) {
        return width;
      }

      return `(${mediaQuery}) ${width}`;
    })
    .join(", ");

const mediaQueries = {
  post: [
    { width: "824px", mediaQuery: "min-width: 1025px" },
    { width: "696px", mediaQuery: "min-width: 768px" },
    { width: "568px", mediaQuery: "min-width: 645px" },
    { width: "100vw" },
  ],
  profile: [
    { width: "128px", mediaQuery: "min-width: 768px" },
    { width: "96px" },
  ],
};

const widths = {
  post: mediaQueriesToWidths("post"),
  profile: mediaQueriesToWidths("profile"),
};

const sizes = {
  post: mediaQueriesToSizes("post"),
  profile: mediaQueriesToSizes("profile"),
};

const responsiveImage = (type, className = "u-photo") => ({ src, alt }) => {
  const defaultWidth = widths[type][widths[type].length - 1];

  const srcset = widths[type]
    .map((width) => `${src}?nf_resize=fit&w=${width} ${width}w`)
    .join(", ");

  return html`<img
    src="${`${src}?nf_resize=fit&w=${defaultWidth}`}"
    srcset="${srcset}"
    sizes="${sizes[type]}"
    alt="${alt}"
    class="${className}"
  />`;
};

module.exports = { responsiveImage };
