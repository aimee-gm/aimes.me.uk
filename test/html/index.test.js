const { expect } = require("chai");

const { fileToCheerio } = require("../helpers/fileSystem");

describe("html // index", () => {
  const $ = fileToCheerio("index.html");

  describe("h-card", () => {
    it("should have a personal h-card element", () => {
      const hCards = $(".h-card").not(".h-entry .h-card, .h-card .h-card");
      expect(hCards).to.have.length(1);

      expect(hCards.first().attr("class")).to.include("aimee");
    });

    it("should have a p-name element", () => {
      expect($(".h-card.aimee .p-name").text()).to.equal("Aimee Gamble-Milner");
    });

    it("should have a u-uid element", () => {
      expect($(".aimee .u-uid").attr("href")).to.equal("https://aimes.me.uk");
    });

    it("should have a u-url element", () => {
      expect($(".aimee .u-url").attr("href")).to.equal("https://aimes.me.uk");
    });

    it("should have a u-photo element", () => {
      expect($(".aimee .u-photo").attr("src")).to.match(/media\.aimes\.me\.uk/);
    });

    it("should have a responsive picture", () => {
      const picture = $(".aimee picture");
      const source = picture.children("source");
      expect(picture).to.have.length(1);
      expect(picture.children("img").attr("src")).to.include(
        ".jpg?nf_resize=fit&w=128"
      );
      expect(source).to.have.length(2);

      expect(source.first().attr("media")).to.equal("(min-width: 768px)");
      expect(source.first().attr("srcset")).to.match(
        /[^ ]+w=256 2x, [^ ]+w=128 1x/
      );
      expect(source.last().attr("media")).to.be.undefined;
      expect(source.last().attr("srcset")).to.match(
        /[^ ]+w=192 2x, [^ ]+w=96 1x/
      );
    });
  });

  describe("h-feed", () => {
    it("should have a h-feed element", () => {
      expect($(".h-feed")).to.have.length(1);
    });

    it("should contain at least one h-entry", () => {
      expect($(".h-feed .h-entry").length).to.be.at.least(1);
    });
  });
});
