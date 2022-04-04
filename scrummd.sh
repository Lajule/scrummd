#!/usr/bin/env bash

case "${1:-build}" in
	build) bundle exec middleman build --clean ;;
	serve) exec bundle exec middleman serve --watcher-force-polling ;;
esac
