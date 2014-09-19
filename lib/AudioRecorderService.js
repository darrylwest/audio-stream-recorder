/**
 * @class AudioRecorderService
 * 
 * @author: darryl.west@roundpeg.com
 * @created: 8/30/14
 */
var dash = require('lodash'),
    uuid = require('node-uuid' ),
    http = require('http');

var AudioRecorderService = function(options) {
    'use strict';

    var service = this,
        log = options.log,
        server = options.server,
        id = options.appkey;

    /**
     * start the audio service to begin responding to client requests
     */
    this.start = function() {

        var port = options.port,
            path = options.path;

        log.info('start the audio recorder service on port: ', port, ', path: ', path);

        service.createServer();

        server.listen( port );
    };

    this.createServer = function() {
        if (!server) {
            log.info('create the http server');

            var opts = dash.clone( options );

            server = http.createServer( this.pageHandler );
        }

        return server;
    };

    this.pageHandler = function(request, response) {
        response.writeHead(200, { 'Content-Type':'text/html' });
        response.end( options.homepage );
    };

    // constructor validations
    if (!log) throw new Error('server must be constructed with a log');
    if (!id) throw new Error('server must be constructed with an appkey');
};

AudioRecorderService.createInstance = function(config) {
    'use strict';

    var logManager;

    if (!config) {
        config = require( __dirname + '/../config.json');
    }

    if (!config.port) throw new Error('server must be constructed with a port');

    // don't damage the original
    config = dash.clone( config );

    logManager = require('simple-node-logger').createLogManager();

    var createAudioRecorderService = function() {
        var opts = dash.clone( config );

        opts.log = logManager.createLogger('AudioRecorderService');

        return new AudioRecorderService( opts );
    };

    return createAudioRecorderService( config );
};

module.exports = AudioRecorderService;