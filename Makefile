.PHONY: clean build init setup-hooks lint test test-watch dev ghpages

clean:
	rm -rf ./dist

init:
	make install
	make setup-hooks

install:
	./scripts/install.sh

setup-hooks:
	./scripts/setup-hooks.sh

dev:
	./scripts/dev.sh

dev-examples:
	./scripts/dev-examples.sh

build:
	./scripts/build.sh

lint:
	./scripts/lint.sh

test:
	./scripts/test.sh

test-watch:
	./scripts/test.sh -w

ghpages:
	./scripts/gh-pages.sh

coverage:
	./scripts/report-coverage.sh
