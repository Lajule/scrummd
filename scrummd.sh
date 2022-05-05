#!/bin/bash

dir="${0%/*}"
base="${0##*/}"

help_message="\
Usage: $base [<options>] <command> [<command-options>]
Run commands related to the scrummd process.
Commands:
  serve                   Run the jekyll server process, useful for
                          development.
  build                   Run the build process.
Global Options:
  -h, --help              Show this help information.
  -v, --verbose           Increase verbosity. Useful for debugging.
"

echo "${dir}"
echo "${base}"
