# Audio Stream Recorder
- - -

A HTML5 audio stream recorder over websockets.

[![NPM version](https://badge.fury.io/js/audio-stream-recorder.svg)](http://badge.fury.io/js/audio-stream-recorder) [![Build Status](https://travis-ci.org/darrylwest/audio-stream-recorder.svg?branch=develop)](https://travis-ci.org/darrylwest/audio-stream-recorder) [![Dependency Status](https://david-dm.org/darrylwest/audio-stream-recorder.svg)](https://david-dm.org/darrylwest/audio-stream-recorder)

## Introduction

The Websocket streaming recorder service...

## Installation

### Server

~~~
	npm install audio-stream-recorder --save
~~~

### Client/Browser

The project includes a "browser" folder with enough to create a websocket spell checker.  Here is a short snippet of the browser code:

~~~
<!DOCTYPE html>
<html>
<head>
    <title>spell check page</title>
    <script src="browser-messaging-commons.js"></script>
    <script src="messaging-config.js"></script>
    <script src="SpellCheckClient.js"></script>
    <script>
        var client;

        var start = function() {
            var options = readMessagingConfig();
            console.log( JSON.stringify( options ));

            client = SpellCheckClient.createInstance( options );

            client.start();

            window.client = client;
        };

    </script>
</head>
~~~


### Server

The project includes a "bin" folder with a run/start/stop and status scripts.  The run script is the same as start, but it runs in the forgound.  It looks something like this:

~~~
	var config = require('./config.json'),
    	AudioRecoderService  = require('audio-stream-recorder'),
        service = AudioRecorderService.createInstance( config );

    service.start();
~~~

The service...

## Configuration

Here is a sample configuration file.

~~~
{
    "port":29169,
    "path":"/AudioRecorder",
    "appkey":"xx"
}
~~~

You would want to have a proxy and preferrably HTTPS in front of this but port 29169 works for development.

## Tests

Unit tests include should/specs, jshint and validate-package.  Tests can be run from the command line with this:

~~~
    make test

    or

    make watch

    or

    grunt mochaTest jshint validate-package
~~~

- - -
<p><small><em>Copyright © 2014, rain city software | Version 0.90.10</em></small></p>
