const { expect } = require("chai");

const { readMicroformats } = require("../helpers/fileSystem");

describe("microformats // h-card", () => {
  it("should match parsed snapshot", async () => {
    const parsed = await readMicroformats("/");
    const hCard = parsed.items[0];

    expect(hCard.properties.name).to.eql(["Aimee Gamble-Milner"]);
    expect(hCard).to.matchSnapshot();
  });
});
