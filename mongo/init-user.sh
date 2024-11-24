#!/usr/bin/env sh

echo "Init database credentials ..."
mongosh -u root -p example --port 27017 < /etc/mongo-init
