#!/bin/bash

source .env

docker buildx build \
  --platform $PLATFORMS \
  -t $DOCKER_USER/carx-backend:latest \
  ./backend \
  --push
