'use strict';

var fs = require('fs'),
    express = require('express'),
    appPath = process.cwd();

module.exports = function() {
    // Express settings
    var app = express();
    require(appPath + '/server/config/express')(app);
    return app;
};
