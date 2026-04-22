SHELL := /bin/sh

GO ?= go
BUN ?= bun
AIR ?= air

.PHONY: build watch notes ogs clean

build:
	$(GO) run ./cmd/generator sync

notes:
	$(GO) run ./cmd/generator notes

ogs:
	$(GO) run ./cmd/generator ogs

watch:
	$(AIR) -c .air.toml

clean:
	rm -rf ./tmp
