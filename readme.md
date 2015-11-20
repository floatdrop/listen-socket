# listen-socket [![Build Status](https://travis-ci.org/floatdrop/listen-socket.svg?branch=master)](https://travis-ci.org/floatdrop/listen-socket)

> Gracefully listen on socket


## Install

```
$ npm install --save listen-socket
```


## Usage

```js
const listenSocket = require('listen-socket');
const server = require('http').createServer();

listenSocket('/var/run/app.socket', server, function (err) {
	if (err) {
		console.log(err);
	}

	console.log('Listening on /var/run/app.socket');
});
```


## API

### listenSocket(socketPath, server)

#### socketPath

Type: `string`

Path to a socket that server should listen to.

#### server

Type: [`http.Server`](https://nodejs.org/api/http.html#http_class_http_server)

Event-emitter with listen method.

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## License

MIT © [Vsevolod Strukchinsky](http://github.com/floatdrop)
