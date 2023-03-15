#!/usr/bin/env bash
echo '{"text": "'$REACT_APP_STAGE' employer-saas-ui updated"}' > message.data
curl -X POST -H 'Content-type: application/json' --data "$(cat message.data)"  $SLACK_WEBHOOK_URL