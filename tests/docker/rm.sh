#!/bin/sh
docker compose stop
echo y | docker compose rm -v
for volume in $(docker compose volumes -q); do
  docker volume rm $volume
done
rm api-key.txt cookie.txt env.admin server.json
