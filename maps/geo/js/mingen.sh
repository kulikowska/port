#!/bin/bash
cat lib/angular.js > all.min.js
cat app.js tpl.min.js ws/* | uglifyjs >> all.min.js
