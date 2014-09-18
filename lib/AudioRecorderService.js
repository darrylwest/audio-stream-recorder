/**
 *
 * @author: darryl.west@roundpeg.com
 * @created: 8/30/14
 */
var dash = require('lodash'),
    uuid = require('node-uuid');

var AudioRecorderService = function(options) {
    'use strict';

    var service = this,
        log = options.log,
        id = options.appkey;

    /**
     * start the audio service to begin responding to client requests
     */
    this.start = function() {
        log.info('start the audio recorder service');

        // service.createMessageProducer();
    };

    // constructor validations
    if (!log) throw new Error('server must be constructed with a log');
    if (!id) throw new Error('server must be constructed with an appkey');
};

AudioRecorderService.createInstance = function(config) {
    'use strict';

    var logManager;

    if (!config) throw new Error('must be constructed with a config object');
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