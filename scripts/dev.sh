#!/bin/bash
export $( cat .env|xargs)
./node_modules/.bin/webpack-dev-server \
  --config ./examples/webpack.config.js \
  --hot \
  --debug \
  --colors \
  --verbose \
  --devtool inline-source-map \
  --display-chunks \
  --progress \
  --history-api-fallback \
  --output-pathinfo
