'use strict';

var fs = require('fs');
var baseConfig = require('./env/all');

// Load all env configurations, in order to set the node environment variable if not set before.
// If no config file was found matching the env variable, it is set to 'development'
process.env.NODE_ENV = ~fs.readdirSync('./server/config/env').map(function(file) {
	return file.slice(0, -3);
}).indexOf(process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

var envConfig =	require('./env/' + process.env.NODE_ENV) || {};

// Merge envConfig into baseConfig to override baseConfig
for (var attrname in envConfig) { baseConfig[attrname] = envConfig[attrname]; }
module.exports = baseConfig;

