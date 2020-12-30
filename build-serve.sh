#!/bin/sh

ls scripts/* src/*.js pages/*.md | entr -s 'node src/index.js && http-server dist -p 8000'
