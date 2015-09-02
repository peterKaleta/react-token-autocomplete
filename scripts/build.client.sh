#!/bin/bash
export $( cat .env-production|xargs)
export NODE_ENV=production

./node_modules/.bin/webpack \
  --colors \
  --verbose \
  --devtool inline-source-map \
  --progress \
  --display-chunks \
  --content-base dist \
  --optimize-occurence-order \
  --bail
