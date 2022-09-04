#!/bin/bash

cd api-article/
git pull
docker build . -t getfast/api-article

cd ..
cd api-user/
git pull
docker build . -t getfast/api-user

cd ..
cd api-menu/
git pull
docker build . -t getfast/api-menu

cd ..
cd api-order/
git pull
docker build . -t getfast/api-order

cd ..
cd api-restaurant/
git pull
docker build . -t getfast/api-restaurant