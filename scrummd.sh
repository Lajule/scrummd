#!/bin/bash

dir="${0%/*}"
base="${0##*/}"
help="\
Usage: $base [<options>] <command> [<command-options>]
Run commands related to the scrummd process.
Commands:
  serve                   Run the jekyll server process, useful for
                          development.
  build                   Run the build process.

Global Options:
  -h, --help              Show this help information.
  -v, --verbose           Increase verbosity. Useful for debugging.

Serve options:
  -l, --livereload        Reload a page automatically on the

Build optons:
  -w, --watch             Activate auto-regeneration.
"

serve() {
	docker run --rm \
		-v $PWD:/srv/jekyll \
		-p 4000:4000 -p 35729:35729 \
		jekyll/jekyll \
		jekyll serve --config _config.yml,_config_development.yml "${verbose}" "${livereload}"
}

build() {
	docker run --rm -v $PWD:/srv/jekyll jekyll/jekyll jekyll build "${verbose}" "${watch}"
}

parse_args() {
	while true; do
		if [[ $1 = "-h" || $1 = "--help" ]]; then
			echo "$help"
			exit 0
		elif [[ $1 = "-v" || $1 = "--verbose" ]]; then
			verbose="--verbose"
			shift
		elif [[ $1 = "-l" || $1 = "--livereload" ]]; then
			livereload="--livereload"
			shift
		elif [[ $1 = "-w" || $1 = "--watch" ]]; then
			watch="--watch"
			shift
		elif [[ $1 = "serve" || $1 = "build" ]]; then
			if [[ -n "${command}" ]]; then
				echo "You can only specify one command." >&2
				exit 1
			fi
			command="$1"
			shift
		elif [[ -n $1 ]]; then
			echo "Unknown command." >&2
			exit 1
		elif [[ -z $1 ]]; then
			break
		fi
	done

	if [[ -z "${command}" ]]; then
		echo "Command not specified." >&2
		exit 1
	fi
}

parse_args "$@"

if [[ -n $verbose ]]; then
	set -o xtrace
	set +o verbose
fi

if [[ "${command}" = "serve" ]]; then
	serve
elif [[ "${command}" = "build" ]]; then
	build
fi
