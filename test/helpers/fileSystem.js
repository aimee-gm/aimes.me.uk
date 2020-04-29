const { readFileSync } = require("fs");
const { resolve } = require("path");
const cheerio = require("cheerio");

exports.fileToCheerio = (path) =>
  cheerio.load(
    readFileSync(
      resolve(
        __dirname,
        "../../dist/",
        path.replace(/^\//, "./").replace(/\/$/, "/index.html")
      )
    )
  );
