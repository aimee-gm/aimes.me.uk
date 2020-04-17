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
  externalLink,
  postResponsiveImage: responsiveImage("post"),
  profileResponsiveImage: responsiveImage("profile", "u-photo profile-picture"),
};
