import test from 'ava';
import listen from './';
import tempfile from 'tempfile';
import http from 'http';
import path from 'path';

test('listens on empty path', t => {
	const socketPath = tempfile('.socket');

	const server = http.createServer();
	listen(socketPath, server, err => {
		server.close();
		t.ifError(err);
		t.end();
	});
});

test('listens on non-existent directory path', t => {
	const socketPath = path.join(tempfile(), 'socket');

	const server = http.createServer();
	listen(socketPath, server, err => {
		server.close();
		t.ifError(err);
		t.end();
	});
});

test('errors on already taken socket', t => {
	const socketPath = path.join(tempfile(), path.basename(tempfile('.socket')));

	const server = http.createServer();
	listen(socketPath, server, err => {
		t.ifError(err);

		const newServer = http.createServer();
		listen(socketPath, newServer, err => {
			server.close();
			newServer.close();
			t.is(err.code, 'EADDRINUSE');
			t.end();
		});
	});
});

test('recreates abandoned socket', t => {
	const socketPath = tempfile('.socket');

	const oldServer = http.createServer();
	listen(socketPath, oldServer, err => {
		oldServer.close();
		t.ifError(err);

		const newServer = http.createServer();
		listen(socketPath, newServer, err => {
			newServer.close();
			t.ifError(err);
			t.end();
		});
	});
});
