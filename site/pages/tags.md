---
pagination:
  data: collections
  size: 1
  alias: collection
  filter:
    - all
    - posts
layout: feed
permalink: "/tags/{{ collection }}/"
renderData:
  title: Tagged “{{ collection }}"
---

<h1>{{ renderData.title }}</h1>
<hr />
