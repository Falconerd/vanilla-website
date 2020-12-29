#!/bin/sh

ls src/*.js pages/*.md | entr -s 'pkill http-server && node src/index.js && http-server dist -p 8000'
