const pretty = require("pretty");

module.exports = {
  prettify: (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      return pretty(content, {
        ocd: true,
      });
    }
  },
  thScope: (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      // this is crude, but makes it accessible and pass HTML validation
      // this breaks down if we ever have the need for scope="row"
      return content.replace(/<th>/g, '<th scope="col">');
    }
  },
};
