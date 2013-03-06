/*!
 * scribely
 * Scribe producer and consumer
 * Copyright(c) 2013 Rob Skillington
 * MIT Licensed
 */

var Scribe = require('scribe').Scribe;
var thrift = require('thrift');

var scribe = require('./gen-nodejs/scribe.js');
var scribeTypes = require('./gen-nodejs/scribe_types.js');

var scribely = {
    log: {
        error: function (msg) {
            console.log('scribely: [error] ' + msg);
        }
    }
};

var Consumer = exports.Consumer = function (handler) {
    if (!handler || typeof handler != 'function') {
        throw 'handler is not a function';
    }

    this.server = thrift.createServer(scribe, {
        Log: function (messages, response) {
            try {
                handler(messages);
            } catch (err) {
                scribely.log.error(err);
                response(scribeTypes.ResultCode.TRY_AGAIN);
            }

            response(scribeTypes.ResultCode.OK);
        }
    });
};

Consumer.prototype.listen = function (port) {
    return this.server.listen(port);
};

var Producer = exports.Producer = function (host, port, opts) {
    var options = {
        autoReconnect: true
    };

    if (opts && typeof opts === 'object' && (opts.autoReconnect === true || opts.autoReconnect === false)) {
        options.autoReconnect = opts.autoReconnect;
    }

    this.client = new Scribe(host, port, options);
};

Producer.prototype.send = function (category, message, errorCallback) {
    var self = this;

    this.client.open(function (error) {
        if (error && typeof errorCallback === 'function') {
            errorCallback(error);
        } else if (error) {
            scribely.log.error(error);
        }

        self.client.send(category, message);
        self.client.close();
    });
};

