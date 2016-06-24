var magikHooks = require('./magik-hooks');

console.log('start test');
var testCode = 'this is my command';

// create hook
magikHooks.create('commit-msg', 'this is new');
magikHooks.create('commit-msg', 'test 222', 'second-time');
// magikHooks.create('commit-msg', 'test 333', 'second-time');

// remove hook
magikHooks.remove('commit-msg');
magikHooks.remove('commit-msg', 'second-time');
