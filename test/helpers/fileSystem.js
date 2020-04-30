const { readFileSync } = require("fs");
const { resolve } = require("path");
const { JSDOM } = require("jsdom");
const jQuery = require("jquery");

exports.fileToJQuery = (path) => {
  const html = readFileSync(
    resolve(
      __dirname,
      "../../dist/",
      path.replace(/^\//, "./").replace(/\/$/, "/index.html")
    )
  );
  const { window } = new JSDOM(html);
  return jQuery(window);
};
