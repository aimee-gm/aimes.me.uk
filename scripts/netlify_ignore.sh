#!/bin/bash

# Ignore build on netlify if we're a dependabot PR

COMMIT_MSG=$(git log --oneline --format=%B -n 1 HEAD | head -n 1)
AUTHOR=$(git log --oneline --format=%an -n 1 HEAD | head -n 1)

if [[ $AUTHOR = *dependabot* ]]; then
  exit 0
fi

if [[ $COMMIT_MSG = *chore\(deps\)\:* ]]; then
  exit 0
fi

if [[ $COMMIT_MSG = *chore\(deps-dev\)\:* ]]; then
  exit 0
fi

exit 1