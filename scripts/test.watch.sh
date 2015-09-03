export $( cat .env|xargs)
export NODE_ENV=testing

./node_modules/mocha/bin/mocha \
  --watch \
  --reporter spec \
  --compilers js:mocha-babel \
  src/**/*.spec.js
