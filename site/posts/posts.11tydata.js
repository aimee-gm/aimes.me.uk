const tagIcons = {
  film: "film",
  beach: "beach",
  exhibition: "exhibition",
  profile_picture: "portrait",
  rsvp: "calendar",
  checkin: "location",
  article: "note",
};

const activityIcons = {
  cycling: "cycling",
};

const tagsToProcess = Object.keys(tagIcons);
const activityTags = Object.keys(activityIcons);

module.exports = {
  layout: "post",
  permalink: "/{{ page.date | date: '%Y/%m/%d' }}/{{ page.fileSlug }}/",
  tags: ["posts"],
  author: {
    name: "Aimee Gamble-Milner",
    url: "/",
  },
  eleventyComputed: {
    icon: (data) => {
      if (data.icon) {
        return data.icon;
      }

      if (data.tags) {
        for (const tag of tagsToProcess) {
          if (data.tags.includes(tag)) {
            return tagIcons[tag];
          }
        }

        if (data.postType === "activity") {
          for (const tag of activityTags) {
            if (data.tags.includes(tag)) {
              return activityIcons[tag];
            }
          }
        }
      }

      return data.postType;
    },
    title: (data) => {
      if (data.title || data.postType === "note") {
        return data.title;
      }

      if (data.photo && data.tags.includes("profile_picture")) {
        return "Uploaded a new profile picture";
      }

      if (data.checkin && data.checkin.event) {
        return `Checked into ${data.checkin.name} for ${data.checkin.event.name}`;
      }

      if (data.checkin) {
        return `Checked into ${data.checkin.name}`;
      }

      if (data.bookmark) {
        return `Bookmarked ${data.bookmark.name}`;
      }

      if (data.reply && data.reply.rsvp) {
        return `RSVP ${data.reply.rsvp} for ${data.reply.name}`;
      }
    },
  },
};
