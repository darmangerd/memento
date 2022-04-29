#!/bin/bash

docker image rm -f production_nginx
docker image rm -f production_php
docker-compose down -v
docker-compose rm -sf
docker-compose --env-file .env up
