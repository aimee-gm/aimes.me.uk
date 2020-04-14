const { html } = require("common-tags");
const { responsiveImage } = require("./media");

const pageTitle = (pageTitle, siteTitle) => {
  const maxLength = 65 - siteTitle.length - 6;
  const truncatedTitle =
    pageTitle && pageTitle.length > maxLength
      ? pageTitle.substr(0, maxLength) + "..."
      : pageTitle;

  return pageTitle ? `${truncatedTitle} ⁠- ${siteTitle}` : siteTitle;
};

const icon = (iconName) =>
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

module.exports = {
  pageTitle,
  icon,
  pronouns,
  locality,
  externalLink,
  postResponsiveImage: responsiveImage("post"),
  profileResponsiveImage: responsiveImage("profile", "u-photo profile-picture"),
};
