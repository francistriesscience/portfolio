SHELL := /bin/sh

GO ?= go
BUN ?= bun
AIR ?= air

.PHONY: build dev notes ogs clean

build:
	$(GO) run ./cmd/generator sync

notes:
	$(GO) run ./cmd/generator notes

ogs:
	$(GO) run ./cmd/generator ogs

dev:
	$(AIR) -c .air.toml

clean:
	rm -rf ./tmp
