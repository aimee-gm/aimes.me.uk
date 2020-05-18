#!/bin/bash

DATE=$(date --rfc-3339=date);
TIMESTAMP=$(date --rfc-3339=seconds);

TYPE=$1;
SLUG=$2;

if [ ! -d "./site/posts/${TYPE}s" ]; then
  echo "Invalid post type";
  exit 1;
fi;

if [ -z "$SLUG" ]; then
  echo "Missing post slug";
  exit 1;
fi;

TARGET="./site/posts/${TYPE}s/${DATE}-${SLUG}.md";

echo "Creating file: ${TARGET}";

cp "${BASH_SOURCE%/*}/templates/default.md" "./site/posts/${TYPE}s/${DATE}-${SLUG}.md";

sed -i "s/__DATE__/${TIMESTAMP}/g" $TARGET