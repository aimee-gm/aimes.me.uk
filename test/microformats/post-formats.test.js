const { expect } = require("chai");

const { readMicroformats } = require("../helpers/fileSystem");

describe("microformats // post-types", () => {
  it("should handle checkins correctly", async () => {
    const parsed = await readMicroformats("/2020/03/08/view-from-the-shard/");

    expect(parsed.items).to.have.nested.property(
      "[0].properties.name[0]",
      "Checked into The View from The Shard"
    );

    expect(parsed.items).to.matchSnapshot();
  });

  it("should handle photos correctly", async () => {
    const parsed = await readMicroformats(
      "/2020/04/06/olympic-park-contact-sheet/"
    );

    expect(parsed.items).to.have.nested.property(
      "[0].properties.name[0]",
      "Olympic Park Contact Sheet"
    );

    expect(parsed.items).to.matchSnapshot();
  });

  it("should handle notes correctly", async () => {
    const parsed = await readMicroformats("/2020/04/05/bookmarks/");

    expect(parsed.items).to.have.nested.property(
      "[0].properties.content[0].value",
      "I've just added two new features my site: bookmarks 🔖 and notes 📝. And this is my first note 🙌"
    );

    expect(parsed.items).to.matchSnapshot();
  });

  it("should handle bookmarks correctly", async () => {
    const parsed = await readMicroformats("/2020/04/05/metro-carto/");

    expect(parsed.items).to.have.nested.property(
      "[0].properties.name[0]",
      "Carto-metro map, London"
    );

    expect(parsed.items).to.matchSnapshot();
  });

  it("should handle RSVPs correctly", async () => {
    const parsed = await readMicroformats("/2020/04/17/tech-nottingham/");

    expect(parsed.items).to.not.have.nested.property("[0].properties.name");

    expect(parsed.items).to.matchSnapshot();
  });
});
