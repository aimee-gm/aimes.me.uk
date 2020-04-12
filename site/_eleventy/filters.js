const { format } = require("date-fns");
const { URL } = require("url");

const justDateFormat = "EEE, do LLL YYY";
const londDateFormat = `${justDateFormat} 'at' h:mm aaaa`;

const isoDate = (date) => date.toISOString();
const longDate = (date) => format(date, londDateFormat);
const visibleTags = (tags) => tags.filter((tag) => !["posts"].includes(tag));
const hostname = (url) => new URL(url).hostname;
const toDate = (str) => str && new Date(str);
const justDate = (date) => format(date, justDateFormat);

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
};
