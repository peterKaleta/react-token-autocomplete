#!/bin/bash
export $( cat .env|xargs)
git checkout gh-pages
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
export BRANCH=$branch
make build
git push origin gh-pages
git checkout master
