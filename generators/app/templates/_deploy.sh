#!/usr/bin/env bash

CONTAINER_NAME=<%= containerNamespace %>/<%= projectName %>
CONTAINER_PORT=9000
VERSION=$1
ENV=${2:-production}

docker build -t ${CONTAINER_NAME}:${VERSION} .

docker run \
    -d \
    --restart=always \
    -e NODE_ENV=${ENV} \
    -p ${LOCAL_IPV4}::9000 \
    ${CONTAINER_NAME}:${VERSION}
