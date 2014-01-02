'use strict';


var kraken = require('kraken-js'),
    db = require('./lib/database'),
    language = require('./lib/language'),
    express = require('express'),
    paypal = require('paypal-rest-sdk'),
    app = {};


app.configure = function configure(nconf, next) {

    // db config
    db.config(nconf.get('databaseConfig'));
    
    //Configure the PayPal SDK
    paypal.configure(nconf.get('paypalConfig'));

    next(null);
};


app.requestStart = function requestStart(server) {
    // Run before most express middleware has been registered.
};


app.requestBeforeRoute = function requestBeforeRoute(server) {
    // Run before any routes have been added.
    server.use(express.methodOverride());
    server.use(language());
};


app.requestAfterRoute = function requestAfterRoute(server) {
    // Run after all routes have been added.
};


if (require.main === module) {
    kraken.create(app).listen(function (err) {
        if (err) {
            console.error(err);
        }
    });
}


module.exports = app;