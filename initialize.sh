#!/usr/bin/env bash
## path:
ROOT_PATH=$(dirname $BASH_SOURCE);

## install crontab:
yum install vixie-cron crontabs;

unset ROOT_PATH;
