const { readFileSync } = require("fs");
const { resolve } = require("path");
const { mf2 } = require("microformats-parser");

exports.readMicroformats = async (path) => {
  const html = readFileSync(
    resolve(
      __dirname,
      "../../dist/",
      path.replace(/^\//, "./").replace(/\/$/, "/index.html")
    ),
    "utf8"
  );

  return mf2(html, { baseUrl: "http://localhost:5000" });
};
