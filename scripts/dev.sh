#!/bin/bash
export $( cat .env|xargs)
./node_modules/.bin/webpack-dev-server \
  --hot \
  --debug \
  --colors \
  --verbose \
  --devtool inline-source-map \
  --display-chunks \
  --progress \
  --content-base dist \
  --history-api-fallback \
  --output-pathinfo
