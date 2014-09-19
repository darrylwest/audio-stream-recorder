#!/usr/bin/env node

var config = require( __dirname + '/../config.json'),
    AudioRecorderService = require( __dirname + '/../index'),
    service;
    
// don't run in background...
config.daemon = false;
console.log('config: ', config);

service = AudioRecorderService.createInstance( config );
service.start();

