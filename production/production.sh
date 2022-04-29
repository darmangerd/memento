#!/bin/bash

docker-compose down -v
docker-compose rm -sf 
docker-compose --env-file .env up
