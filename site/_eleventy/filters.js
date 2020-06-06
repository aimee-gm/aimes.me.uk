const { format } = require("date-fns");
const { URL } = require("url");

const baseUrl =
  process.env.BRANCH && process.env.BRANCH !== "master"
    ? process.env.DEPLOY_PRIME_URL
    : process.env.URL || "";

const justDateFormat = "EEE, do LLL YYY";
const longDateFormat = `${justDateFormat} 'at' h:mm aaaa`;

const indexPaginationPermalink = (pageNumber) =>
  pageNumber ? `/page/${pageNumber + 1}/` : "/";
const isoDate = (date) => date.toISOString();
const longDate = (date) => format(date, longDateFormat);
const visibleTags = (tags) => tags.filter((tag) => !["posts"].includes(tag));
const hostname = (url) => new URL(url).hostname;
const toDate = (str) => str && new Date(str);
const justDate = (date) => format(date, justDateFormat);
const tagUrl = (tag) => `/tags/${tag}/`;
const canonicalUrl = (url) =>
  baseUrl ? new URL(url, baseUrl).toString() : url;

const rsvpText = (rsvp) => {
  switch (rsvp) {
    case "yes":
      return "Will attend";
    case "maybe":
      return "Might attend";
    case "no":
      return "Won't attend";
  }
};

const duration = (sec) => {
  const seconds = sec % 60;
  const minutes = Math.floor(sec / 60) % 60;
  const hours = Math.floor(sec / 3600);

  if (hours) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
};

module.exports = {
  isoDate,
  longDate,
  visibleTags,
  hostname,
  toDate,
  justDate,
  rsvpText,
  tagUrl,
  canonicalUrl,
  indexPaginationPermalink,
  duration,
};
