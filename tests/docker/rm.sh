#!/bin/sh
docker compose stop
echo y | docker compose rm
rm api-key.txt cookie.txt env.admin server.json
