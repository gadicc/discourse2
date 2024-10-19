#!/bin/sh

# No need to change these, they match the defaults and are sufficient for testing.
ADMIN_USER="user"
ADMIN_PASSWORD="bitnami123"
DISCOURSE_URL="http://localhost"

docker-compose up -d

# CONTAINER_ID=`docker ps -f NAME=docker-discourse-1 -q`
# echo CONTAINER_ID=$CONTAINER_ID

echo "Waiting for Discourse to finish starting (can take up to 2m)..."
while ! curl -s -o /dev/null $DISCOURSE_URL; do
  sleep 0.1 # wait for 1/10 of the second before check again
done
echo "Discourse is up and running."

# Create admin user
# docker exec -it $CONTAINER_ID /bin/bash -c 'cd /opt/bitnami/discourse && echo -e $ADMIN_EMAIL\\n$ADMIN_PASSWORD\\n$ADMIN_PASSWORD\\nY | RAILS_ENV=production bundle exec rake admin:create'

ARGS=(-b cookie.txt -c cookie.txt -H "X-Requested-With: XMLHttpRequest")
function curly {
  curl "${ARGS[@]}" "$@"
}

CSRF=`curly -s -X GET $DISCOURSE_URL/session/csrf | jq -r '.csrf'`
ARGS+=(-H "X-CSRF-Token: $CSRF")

curly -s -o /dev/null -X POST -H 'Content-Type: application/x-www-form-urlencoded' -d "login=$ADMIN_USER&password=$ADMIN_PASSWORD" $DISCOURSE_URL/session

API_KEY=`curly -s -X POST -H 'Content-Type: application/json' -d '{"key":{"description":"testing","username":null}}' $DISCOURSE_URL/admin/api/keys | jq -r '.key.key'`
echo API_KEY=$API_KEY
echo $API_KEY > api-key.txt

echo "{" > server.json
echo "  \"url\": \"$DISCOURSE_URL\"," >> server.json
# echo "  \"username\": \"$ADMIN_USER\"," >> server.json
# echo "  \"password\": \"$ADMIN_PASSWORD\"," >> server.json
echo "  \"apiKey\": \"$API_KEY\"" >> server.json
echo "}" >> server.json

