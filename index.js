'use strict';

var net = require('net');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = function listenSocket(socket, server, cb) {
	server.listen(socket, function () {
		return fs.stat(__filename, function (err, stats) {
			if (err) {
				cb(err);
				return;
			}

			process.setuid(stats.uid);
		});
	});

	if (!isNaN(parseInt(socket, 10))) {
		return server;
	}

	mkdirp.sync(path.dirname(socket));

	server.on('listening', function () {
		fs.chmod(socket, 0x0777, function (err) {
			cb(err);
		});
	});

	server.on('error', function (e) {
		if (e.code !== 'EADDRINUSE') {
			cb(e);
			return;
		}

		net.connect({path: socket}, function (e) {
			cb(e);
			return;
		})
		.on('error', function (e) {
			if (e.code !== 'ECONNREFUSED') {
				cb(e);
				return;
			}

			fs.unlinkSync(socket);
			server.listen(socket);
		});
	});

	return server;
};
