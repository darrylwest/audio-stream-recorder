/**
 * @class AudioRecorderService
 *
 * @author: darryl.west@roundpeg.com
 * @created: 8/30/14
 */
var dash = require( 'lodash' ),
    uuid = require( 'node-uuid' ),
    http = require( 'http' ),
    BinaryServer = require( 'binaryjs' ).BinaryServer,
    version = require( '../package.json' ).version;

var AudioRecorderService = function(options) {
    'use strict';

    var service = this,
        log = options.log,
        fs = options.fs || require( 'fs' ),
        httpServer = options.httpServer,
        socketServer = options.socketServer,
        id = options.appkey;

    /**
     * start the audio service to begin responding to client requests
     */
    this.start = function() {

        var port = options.port;

        service.createHTTPServer();

        log.info('start the audio recorder service on port: ', port);

        httpServer.listen( port );

        service.createSocketServer();
    };

    this.createSocketServer = function() {
        var opts = {};

        if (!socketServer) {
            opts.server = service.createHTTPServer();
            opts.path = options.path;

            log.info('create the binary socket with path: ', opts.path);

            socketServer = new BinaryServer( opts );
            socketServer.on( 'connection', service.handleConnection );
            socketServer.on( 'error', function(err) {
                log.error( err );
                throw err;
            });
        }

        return socketServer;
    };

    this.handleConnection = function(client) {
        var id = uuid.v4();

        log.info('new connection, id: ', id, ', total clients: ', socketServer.clients.length);

        // send the connect response with id, filename, etc.
        // client.send( obj );

        // create the client object...
    };

    this.createHTTPServer = function() {
        if (!httpServer) {
            log.info('create the http server');

            var opts = dash.clone( options );

            httpServer = http.createServer( this.pageHandler );
        }

        return httpServer;
    };

    this.pageHandler = function(request, response) {
        log.info('page request: ', request.url);
        if (request.method === 'GET') {
            response.writeHead(200, { 'Content-Type':'text/html' });
            response.end( options.homepage.replace( /{{VERSION}}/, version ) );
        } else if (request.method === 'POST') {
            var obj = { status:'ok' };
            response.writeHead(200, { 'Content-Type':'application/json' });
            response.end( JSON.stringify( obj ) );
        }
    };

    // constructor validations
    if (!log) throw new Error('server must be constructed with a log');
    if (!id) throw new Error('server must be constructed with an appkey');

    log.info('version: ', version);
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