#!/bin/bash
export $( cat .env|xargs)
git checkout gh-pages
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
export BRANCH=$branch
git merge master --no-edit
make build
git add -A
git commit -m "new docs"
git push origin gh-pages
git checkout master
