const { format } = require("date-fns");
const { URL } = require("url");

const baseUrl = process.env.DEPLOY_PRIME_URL || process.env.URL || "";

const justDateFormat = "EEE, do LLL YYY";
const londDateFormat = `${justDateFormat} 'at' h:mm aaaa`;

const isoDate = (date) => date.toISOString();
const longDate = (date) => format(date, londDateFormat);
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
};
