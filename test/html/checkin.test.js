const { expect } = require("chai");

const { fileToCheerio } = require("../helpers/fileSystem");

const url = "/2020/03/08/view-from-the-shard/";

describe("html // checkin", () => {
  const $ = fileToCheerio(url);

  describe("h-entry", () => {
    it("should have a p-name", () => {
      expect($(".h-entry data.p-name").attr("value")).to.equal(
        "Checked into The View from The Shard"
      );
    });

    it("should have the correct icon", () => {
      expect($(".post-icon .icon").html()).to.include("icons.svg#location");
    });

    it("should have a u-checkin", () => {
      const checkin = $(".h-entry .u-checkin.h-card.p-location");

      expect(checkin).to.have.length(1);

      expect(checkin.find(".p-name").first().text()).to.equal(
        "The View from The Shard"
      );

      expect(checkin.find(".u-url").first().attr("href")).to.include(
        "foursquare"
      );
    });

    it("should have an address", () => {
      const adr = $(".u-checkin .p-adr.h-adr");
      expect(adr).to.have.length(1);

      expect(adr.find(".p-extended-address").text()).to.equal("Bermondsey");
      expect(adr.find(".p-locality").text()).to.equal("London");
      expect(adr.find(".p-country").text()).to.equal("UK");
    });
  });
});
