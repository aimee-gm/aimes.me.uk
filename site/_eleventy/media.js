const { html } = require("common-tags");

const mediaQueries = {
  post: [
    { width: 824, mediaQuery: "(min-width: 1024px)" },
    { width: 696, mediaQuery: "(min-width: 768px)" },
    { width: 568, mediaQuery: "(min-width: 420px)" },
    { width: 348 },
  ],
  profile: [{ width: 128, mediaQuery: "(min-width: 768px)" }, { width: 96 }],
};

const responsiveImage = (type, className = "u-photo") => ({ src, alt }) => {
  const media = mediaQueries[type];

  return html` <picture>
    ${media.map(
      ({ width, mediaQuery }) => html`<source
        ${mediaQuery ? `media="${mediaQuery}"` : ""}
        srcset="
          ${`${src}?nf_resize=fit&w=${width * 2}`} 2x,
          ${`${src}?nf_resize=fit&w=${width}`} 1x
        "
      />`
    )}
    <img
      src="${`${src}?nf_resize=fit&w=${media[0].width}`}"
      alt="${alt}"
      class="${className}"
    />
  </picture>`;
};

module.exports = { responsiveImage };
