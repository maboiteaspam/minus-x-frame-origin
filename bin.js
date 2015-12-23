#!/usr/bin/env node

function usage () {/*

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
 */}

var argv  = require('minimist')(process.argv.slice(2));
var pkg   = require('./package.json')
var debug = require('@maboiteaspam/set-verbosity')(pkg.name, process.argv);
var help  = require('@maboiteaspam/show-help')(usage, process.argv, pkg);

(!argv['_'] || !argv['_'].length) && help.print(usage, pkg) && help.die("Missing headers to delete");

var toDelete = [].concat(argv['_'])
toDelete.map(function(r){return r.toLowerCase().replace(/^\s*|\s*$/, '').replace(/:$/, '')})

require('@maboiteaspam/get-bind')(argv.b || argv.bind, '127.0.0.1')
  .then(function (bind) {
    var k = console.error;
    require('./index')(bind)
      .on('error', k)
      .on('listening', function () {
        this.removeListener('error', k);
        debug('server listening')
        console.log('proxy is up at %s', bind)
      })
  }).catch(console.error)
