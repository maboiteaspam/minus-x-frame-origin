# minus-x-frame-origin

http proxy to temper response headers

## Install

    npm i @maboiteaspam/minus-x-frame-origin --save-dev

## Usage

```bash

    @maboiteaspam/minus-x-frame-origin 1.0.0
    http proxy to temper response headers

    Usage
        minus-x-frame-origin [opts] [headers to delete...]

    Options
        -v|--verbose          verbose
        -h|--help             show help
        -b|--bind             address to bind such localhost:3000
        -d|--delete           headers to delete

    Examples
        minus-x-frame-origin -v
        minus-x-frame-origin -h
        minus-x-frame-origin -b localhost:3000
        minus-x-frame-origin -b localhost:3000 x-frame-origin X-Powered-By
```

## API

`minus-x-frame-origin` is a `function (bind, toDelete)` which returns a node http `server`

__bind__ is a parameter of type `string` such `127.0.0.1:6666`.

__toDelete__ is a parameter of type `array`, it must contains a list of response headers to delete such `['x-frame-origin']`.

```js
    require('@maboiteaspam/minus-x-frame-origin')('localhost:3000', ['X-GitHub-Request-Id'])
      .on('error', console.error)
      .on('listening', function () {
        console.log('proxy is up at localhost:3000')
      })
```

## Read More

- https://github.com/maboiteaspam/get-bind
- https://nodejs.org/api/net.html#net_server_listen_handle_callback
- https://nodejs.org/api/http.html#http_class_http_server
- http://stackoverflow.com/questions/20351637/how-to-create-a-simple-http-proxy-in-node-js
- https://github.com/nodejitsu/node-http-proxy
- https://github.com/rse/node-http-proxy-simple
- https://github.com/No9/harmon
- https://github.com/braintree/mallorca
- https://github.com/tomas/needle
- https://github.com/pkrumins/nodejs-proxy
- https://github.com/christophebe/simple-proxies
- https://github.com/InstantWebP2P/node-httpp-proxy
