#!/bin/bash

source .env

docker buildx build \
  --platform $PLATFORMS \
  -t $DOCKER_USER/carx-frontend:latest \
  ./frontend \
  --push
