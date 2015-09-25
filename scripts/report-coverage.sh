#!/bin/bash
export $( cat .env|xargs)
cat ./tests/coverage/cobertura/cobertura-coverage.xml | ./node_modules/.bin/codecov
