const pretty = require("pretty");

module.exports = {
  prettify: (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      return pretty(content, {
        ocd: true,
      });
    }
  },
  validHtml: (content, outputPath) => {
    if (!outputPath.endsWith(".html") || !content) {
      return content;
    }

    if (content.includes("<th>")) {
      // this is crude, but makes it accessible and pass HTML validation
      // this breaks down if we ever have the need for scope="row"
      content = content.replace(/<th>/g, '<th scope="col">');
    }

    if (content.includes("<br>")) {
      // eleventy syntax highlighter uses <br>
      return content.replace(/<br>/g, "<br/>");
    }

    return content;
  },
};
