'use strict';

var test = require('tape');
var magikHooks = require('./magik-hooks');

test('it should have a create method', function(t){
    t.equal(typeof magikHooks.create, 'function');
    t.end();
});

test('it should have a remove method', function(t){
    t.equal(typeof magikHooks.remove, 'function');
    t.end();
});
