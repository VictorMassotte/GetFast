#!/bin/bash

cd api-gateway/
git pull
docker build . -t getfast/api-gateway
