#!/usr/bin/env bash
# Crontab entry (run every 5 minutes):
# */5 * * * * /home/ubuntu/oli-cinematics/.deploy/keep-alive.sh

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health)
echo "${TIMESTAMP} health=${RESPONSE}" >> /tmp/keep-alive.log
