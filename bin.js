#!/usr/bin/env node

function usage () {/*

    Usage
        minus-x-frame-origin [opts]

    Options
        -v             verbose
        -h             show help

    Examples
        minus-x-frame-origin -v
        minus-x-frame-origin -h
*/}

var argv  = require('minimist')(process.argv.slice(2));
var debug = require('@maboiteaspam/set-verbosity')('minus-x-frame-origin', process.argv);
var pkg   = require('./package.json')
var help  = require('@maboiteaspam/show-help')(usage, process.argv, pkg);

// (!argv['_'] || !!argv['_']) && help.print(usage, pkg) && help.die();
