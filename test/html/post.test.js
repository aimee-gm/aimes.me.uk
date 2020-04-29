const { expect } = require("chai");

const { fileToCheerio } = require("../helpers/fileSystem");

const url = "/2020/03/08/view-from-the-shard/";

describe("html // post", () => {
  const $ = fileToCheerio(url);

  describe("h-entry", () => {
    it("should have a permalink", () => {
      const permalink = $(".h-entry .u-url").not(".h-card .u-url");
      expect(permalink).to.have.length(1);
      expect(permalink.attr("href")).to.equal(url);
    });

    it("should have a published time", () => {
      const published = $(".h-entry .dt-published");
      expect(published).to.have.length(1);
      expect(published.attr("datetime")).to.equal("2020-03-08T15:00:00.000Z");
      expect(published.text().trim()).to.equal(
        "Sun, 8th Mar 2020 at 3:00 p.m."
      );
    });

    it("should have tags", () => {
      const tags = $(".h-entry .p-category");
      expect(tags).to.have.length(1);
    });

    it("should have an author h-card", () => {
      const hCard = $(".h-entry .p-author.h-card");
      expect(hCard).to.have.length(1);
      expect(hCard.first().text().trim()).to.equal("Aimee Gamble-Milner");
      expect(hCard.find(".u-url").attr("href")).to.equal("/");
      expect(hCard.find(".u-photo").attr("src")).to.match(
        /https:\/\/media\.aimes\.me\.uk\/.+\.jpg\?nf_resize=fit&w=824/
      );
    });
  });
});
