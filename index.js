
var pkg     = require('./package.json')
var debug   = require('debug')(pkg.name)

var minusXFrameOrigin = function (bind, toDelete) {

  toDelete = toDelete || ['x-frame-origin'];

  var http = require('http');
  var url  = require('url')

  debug('server will listen at %s', bind)

  var server = http.createServer(onRequest);

  function onRequest(client_req, client_res) {
    debug('got request %s %s', client_req.url, client_req.method)

    var options     = url.parse(client_req.url);
    options.method  = client_req.method;
    options.headers = client_req.headers;

    // firefox autodetect proxy function has some weird behavior, not sure what is expected.
    if (!options.host) return debug(client_req), client_res.writeHead(200), client_res.end();

    debug('options %j', options)

    var proxy = http.request(options);

    client_req.pipe(proxy, {
      end: true
    })

    client_req.on('error', console.error)

    proxy.on('error', console.error)

    proxy.on('response', function(res) {
      debug('before %s %j', res.statusCode, res.headers)
      toDelete.map(function(t){ delete res.headers[t] })
      debug('after %s %j', res.statusCode, res.headers)
      client_res.writeHead(res.statusCode, res.headers);
      res.pipe(client_res, {
        end: true
      })
    })
  }

  server.on('error', console.error)

  process.nextTick(function () {
    server.listen(bind.match(/([^:]+)$/)[1], bind.match(/^([^:]+)/)[1]);
  })

  return server;
}

module.exports = minusXFrameOrigin;
