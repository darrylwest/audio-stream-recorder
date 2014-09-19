/**
 *
 * @author: darryl.west@roundpeg.com
 * @created: 8/30/14
 */
var should = require('chai').should(),
    dash = require('lodash'),
    MockLogger = require('simple-node-logger').mocks.MockLogger,
    AudioRecorderService = require('../lib/AudioRecorderService');

describe('AudioRecorderService', function() {
    'use strict';

    var createOptions = function() {
        var opts = {};

        opts.log = MockLogger.createLogger('AudioRecorderService');
        opts.appkey = 'test-server';

        return opts;
    };

    describe('#instance', function() {
        var service = new AudioRecorderService( createOptions()),
            methods = [
                'start',
                'createServer',
                'pageHandler'
            ];

        it('should create an instance of AudioRecorderService', function() {
            should.exist( service );
            service.should.be.instanceof( AudioRecorderService );
        });

        it( 'should contain all known methods based on method count and type', function() {
            dash.methods( service ).length.should.equal( methods.length );
            methods.forEach(function(method) {
                service[ method ].should.be.a('function');
            });
        });
    });
});