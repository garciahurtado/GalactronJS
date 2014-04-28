'use strict';

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Initializing system variables
var config = require('./server/config/config');

// Bootstrap Models, Dependencies, Routes and the app as an express app
var app = require('./server/config/system/bootstrap')();

// Start the app by listening on <port>
app.listen(config.port);
console.log('Express app started on port ' + config.port);

// Expose app
exports = module.exports = app;
