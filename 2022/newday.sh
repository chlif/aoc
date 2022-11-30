#!/bin/sh

DIR=$(date +"%d")

if [ -d "$DIR" ]; then
  echo "$DIR already exists"
else
  echo "Create new folder $DIR"
  cp -R _ $DIR
fi
