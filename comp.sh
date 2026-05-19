#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"

jar cf "$1.war" -C "$1" .
