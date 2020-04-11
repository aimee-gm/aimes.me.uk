const { html } = require("common-tags");
const { responsiveImages } = require("@aimee.gm/responsive");

const pageTitle = (pageTitle, siteTitle) => {
  const maxLength = 65 - siteTitle.length - 6;
  const truncatedTitle =
    pageTitle && pageTitle.length > maxLength
      ? pageTitle.substr(0, maxLength) + "..."
      : pageTitle;

  return pageTitle ? `${truncatedTitle} ⁠- ${siteTitle}` : siteTitle;
};

const copyrightYear = () => new Date().getFullYear().toString();

const icon = iconName =>
  html`
    <svg focusable="false" class="icon">
      <use xlink:href="/assets/images/icons.svg#${iconName}"></use>
    </svg>
  `;

const pronouns = ({ nominative, oblique }) => html`
  <span class="p-x-pronoun-nominative">${nominative}</span>/<span
    class="p-x-pronoun-oblique"
    >${oblique}</span
  >
`;

const locality = ({ city, country }) => html`
  <span class="p-locality">${city}</span>,
  <span class="p-country-name">${country}</span>
`;

const externalLink = (url, label, className) => html`
  <a
    href="${url}"
    target="_blank"
    rel="noopener"
    ${className ? `class="${className}"` : ""}
    >${label}</a
  >
`;

const profilePicture = ({ url, alt }) =>
  html`
    <img class="u-photo profile-picture" alt="${alt}" src="${url}" />
  `;

const responsive = (filepath, alt) => {
  const { src, srcset } = responsiveImages(filepath);

  const sizes = [
    "(min-width: 1025px) 864px",
    "(min-width: 768px) 736px",
    "(min-width: 645px) 608px",
    "100vw",
  ].join(", ");

  return `<img src="${src}" srcset="${srcset}" sizes="${sizes}" alt="${alt}" class="u-photo" />`;
};

module.exports = {
  pageTitle,
  copyrightYear,
  icon,
  pronouns,
  locality,
  externalLink,
  profilePicture,
  responsive,
};
