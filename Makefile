.PHONY: clean build init setup-hooks lint test test-watch dev

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
	./scripts/build.client.sh

lint:
	./scripts/lint.sh

test:
	./scripts/test.sh

test-watch:
	./scripts/test.watch.sh
