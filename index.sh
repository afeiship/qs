#!/usr/bin/env bash
## path:
ROOT_PATH=$(dirname $BASH_SOURCE);


## alias:
alias cron-start='service crond start';
alias cron-stop='service crond stop';
alias cron-restart='service crond restart';
alias cron-reload='service crond reload';
alias cron-status='service crond status';
alias e-cron='crontab -e';


unset ROOT_PATH;
