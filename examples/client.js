#!/usr/bin/env node

var dash = require('lodash'),
    config = require( __dirname + '/../config.json' ),
    AudioRecorderService  = require( __dirname + '/../index' );

consumer.onMessage(function(msg) {
    if (msg.ssid === config.appkey) {
        console.log( msg );
    }
});

