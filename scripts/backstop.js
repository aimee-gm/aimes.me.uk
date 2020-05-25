const express = require("express");
const backstop = require("backstopjs");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "../dist")));

const server = app.listen(5000, () => {
  app.emit("ready", null);
});

app.on("ready", async () => {
  try {
    await backstop("test");
    server.close(() => {
      process.exit(0);
    });
  } catch (err) {
    if (process.argv.includes("approve")) {
      await backstop("approve");
      await backstop("test");
    }

    server.close(() => {
      process.exit(1);
    });
  }
});
