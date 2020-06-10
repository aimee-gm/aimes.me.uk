---
title: Testing Static Site Generator Output
summary: A list of tools and techniques that help me to be confident when making changes
date: 2020-05-27 17:49:00-01:00
---

## Why?

- Workflow difficult when working alone
- More time testing than doing
- Confidence in making changes

## Testing

### HTML Validation

`html-validate` provides a command-line tool for validating static HTML against a set of rules. This catches basic mistakes, such as forgetting to close a tag, to less-obvious rules, like ensuring `<th>` elements have a `scope` attribute - which is used by screen readers.

Testing a directly can be done with a simple command:

```
html-validate './dist/**/*.html'
```

The rules `html-validate` uses can also be configured using a `.htmlvalidate.json` file. For example:

```json
{
  "extends": ["htmlvalidate:recommended"],
  "rules": {
    "no-trailing-whitespace": "off",
    "void-style": ["error", { "style": "selfclosing" }],
    "no-raw-characters": "off"
  }
}
```

HTML validation can also be ran in CI, and successful validation is a required step in my pipeline.

### Broken Links

`linkinator` is a tool that can crawl a website and check all links on your website for the status code they return. If it fails to find any, such as another website being offline, `linkinator` will report this and exit with an error code.

```
linkinator ./dist
```

You may wish to avoid some URLs. For example, 3rd parties may block crawlers (including linkinator), so you will always return an error code, or you might want to save bandwidth downloading images from another website.

Linkinator can be configured to "skip" sites that match a provided pattern using a `linkinatoor.config.json` file:

```json
{
  "recurse": true,
  "skip": ["cloudinary.com"]
}
```

Linkinator is ran automatically in CI, but is not a required step. This allows me to fix any broken links that needs addressing, but does not block releasing code when another website is temporarily down or forgot to renew their SSL certificate.

### Microformats

- What packages am I using?
- Summary of what it does
- Why is it useful to do?
- Any pitfalls?
- Running in CI

### Screenshots

- What packages am I using?
- Summary of what it does
- Why is it useful to do?
- Any pitfalls?
- Running in CI

## Future work

- Screenshot approval in CI
- Replace OS emojis with e.g. Twemoji
- Test twitter/og cards

## Screenshot testing a static website... why?

My workflow for making minor changes or refactoring the styles of my website used to go a little like this:

1. Make the change: the easy bit!
2. View the change in a browser. Does it look the same? I think so?
3. Deploy the change. Sweet.
4. Take a break.
5. Find something broken. /facepalm

It turns out, that when tinkering, I would normally spend more time checking I hadn't broken something (or going back to fixing it) than actually making a change. I needed something to ~let me be lazy~ allow me to make changes with confidence! In comes screenshot testing!

## Enter BackstopJS

The tool I quickly decided on was [BackstopJS](https://garris.github.io/BackstopJS/) - mainly for it's simplicity. It uses a headless electron browser to take the screenshots and a simple JSON configuration file to define your scenarios. The killer was that it includes a test comparison tool, so you can choose to approve new screenshots locally without having to use a paid service.

## Running test sceanrios

Test scenarios are defined in `backstop.json`. The key options I found were:

- `viewports`: a list of viewport sizes to use for each test sceanrio. Nicely lets you test mobile layouts without having to remember to toggle mobile view.
- `scenarios`: a list of URLs to visit and screenshot. Also allows you to choose which bits of the DOM to either screenshot or remove all together. Useful to make sure your only capturing what's relevant to your scenario.

A little excerpt from my backstop configuration:

```json
{
  "viewports": [
    { "label": "iPhone XS", "width": 375, "height": 812 },
    { "label": "iPad", "width": 768, "height": 1024 },
    { "label": "Desktop", "width": 1280, "height": 720 }
  ],
  "scenarios": [
    {
      "label": "Layout",
      "url": "http://localhost:5000",
      "removeSelectors": ["main"]
    },
    {
      "label": "Article",
      "url": "http://localhost:5000/2020/04/22/developing-film/",
      "selectors": ["main"]
    },
    ...
  ],
  ...
}
```

_`http://localhost:5000` is where I run a development server, as backstop does not come with one bundled._

Running the test suite simply involves:

- `yarn start` (run the development server)
- `yarn backstop test`

This generates a set of image files that is compared against your source controlled reference images.Approving a change can be easily done by running `yarn backstop approve`.

## It seems so simple

This was an easy point to get to, but there were a few hiccups that I came across while getting a fully-working solution.

### Fonts

The first barrier I faced was that fonts are rendered differently depending on the operating system. Notably, macOS has more font smoothing than Linux. This means any references you approve on one platform can't be used on the other, as the minor differences are sufficient to go over the thresholds.

I found it's best to always test using Linux, and backstop even comes the ability to run tests in a docker container using the `--docker` flag to ensure consistent results across different OSs.

### Emojis

Just remember to avoid using emojis in your screenshot tests - these are also OS specific, and the docker container doesn't support emojis at all!

### Variable content

Often there will be content that regularly changes. For example, the feed on my home page will update whenever I publish a new post, so testing the whole homepage should probably be avoided.

I took a few approaches (and compromises) to solve this:

- Only testing the overall layout, by removing the `<main>` element on a page
- Using individual posts with their permalinks to test the feed visually
- Capturing other individual components, but removing variable content, such as post counts.

## Pitfals

- Running it in CI
