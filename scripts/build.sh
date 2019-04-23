#!/usr/bin/env sh

# app
yarn ng build -c production

# robots
robots="User-agent: *
Disallow:
"

if [[ $CONTEXT == production ]]; then
  echo "$robots" > dist/celeste-search/robots.txt
fi

# netlify
cp netlify.toml dist/celeste-search/
