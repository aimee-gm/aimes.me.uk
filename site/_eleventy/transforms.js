const pretty = require("pretty");

module.exports = {
  prettify: content =>
    pretty(content, {
      ocd: true,
    }),
};
