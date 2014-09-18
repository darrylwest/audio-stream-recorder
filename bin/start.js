#!/usr/bin/env node

var config = require( __dirname + '/../config.json'),
    AudioRecorderService  = require( __dirname + '/../index'),
    service;
    
// run in background...
config.daemon = true;

service = AudioRecorderService .createInstance( config );
service.start();

