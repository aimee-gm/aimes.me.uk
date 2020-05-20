---
title: "Introducing microformats-parser: a new parser for JavaScript"
summary: I wrote a microformats parser. Here's why, and how you can also use it.
date: 2020-05-18 16:56:11+01:00
tags:
  - microformats
  - indieweb
syndication:
  - name: IndieNews
    url: https://news.indieweb.org/en
---

This site hasn't been going for too long (at the time of writing, at least) - but I've always been inspired to include microformats as part of it. This was triggered by [Jamie Tanna](https://www.jvt.me)'s post on [marking up pronoun information](https://www.jvt.me/posts/2019/04/10/pronouns-microformats/) in HTML. I've included marked-up data in my bio and feed, but I would like to also be able to verify this data is correct and as I expect while I'm making changes.

Unfortunately, I've not found an easy way of checking the parsed result without manually inputting it to an online parser, such as one of the many available at [microformats.io](https://microformats.io/). The existing JavaScript microformats parsers are no longer maintained and do not follow the current specification. So naturally, I decided to write my own...

<!--more-->

## The journey

Initially, I aimed to for the parser to only cover microformats v2 (the latest specification). There was already a fairly comprehensive [test suite](https://github.com/microformats/tests) available, that became my basis of a test-driven development approach. I looked to keep the package lightweight, with only one dependency, [parse5](https://www.npmjs.com/package/parse5), which took the heavy-lifting of transforming a HTML string into a nested tree structure. After this, it became a case of walking through the tree structure, and parsing the microformats as you go.

Although only meant to be a v2 parser, the implementation went quicker than I expected, which meant I decided to extend it to also cover back-compatibility with legacy (v1) and mixed(v1/v2) microformats. At this point I released [microformats-parser](https://www.npmjs.com/package/microformats-parser) at `v1.0.0` with an in-browser [demo page](https://aimee-gm.github.io/microformats-parser/). It was also great that after sharing my parser on [#microformats](https://chat.indieweb.org/microformats) there was a quick [community contribution](https://github.com/aimee-gm/microformats-parser/pull/14) to add experimental `lang` parsing.

## Using microformats-parser

[microformats-parser](https://www.npmjs.com/package/microformats-parser) can be installed using `npm` or `yarn` and is supported for all active Node.js LTS releases and for the browser via webpack. The [demo](https://aimee-gm.github.io/microformats-parser/) runs exclusively in-browser, and the package also comes bundled with TypeScript typings.

Example of use:

```javascript
import { mf2 } from "microformats-parser";

const html = '<a class="h-card" href="/" rel="me">Aimee</a>';
const parsed = mf2(html, { baseUrl: "http://example.com/" });

console.log(parsed);
```

Outputs:

```json
{
  "items": [
    {
      "properties": {
        "name": ["Aimee"],
        "url": ["http://example.com/"]
      },
      "type": ["h-card"]
    }
  ],
  "rel-urls": {
    "http://example.com": {
      "rels": ["me"],
      "text": "Aimee"
    }
  },
  "rels": {
    "me": ["http://example.com/"]
  }
}
```

_The base URL is used to resolve relative links, and is typically the URL for the document being parsed_

## How I'm using it

To verify the HTML I'm generating with [eleventy](https://11ty.dev) has the correct microformats, I am comparing the snapshots of selected pages parsed using mocha. This is mostly to verify I have not accidentally changed, added or removed a property that changes the data that is contained in the post while tinkering with a template.

## Source code

The source code for `microformats-parser` can be found on [GitHub](https://github.com/aimee-gm/microformats-parser).

## Get involved

Use JavaScript and microformats? Please help this project out by [contributing](https://github.com/aimee-gm/microformats-parser/blob/master/CONTRIBUTING.md) - whether that be testing the parser out and creating an issue for a bug, or opening a Pull Request to make a change. Contributions are welcome!

## License

`microformats-parser` is released under the [MIT license](https://choosealicense.com/licenses/mit/).
