magik-hooks
------------
Creates or updates a git hook. Before installing, please read the warning below. 

Install
-------
Install this in your project like this:
`$ npm install --save-dev magik-hooks`

Usage
-----
After installation, you can use this package in your code like this:
```js
// require magik-hooks so it's available
const magikHooks = require('magik-hooks');

// create a new hook, assuming commands holds the actual commands string
// optionally provide an identifier so it can be removed easily at a later time
magikHooks.create('pre-commit', commands[, identifier]);

// removes a hook, optionally provide an identifier so only that particular hoo
// will be removed.
magikHooks.remove('pre-commit'[, identifier]);

```

Uninstall
---------
To uninstall, simply type this on the command line:
`$ npm uninstall --save-dev magik-hooks`

W A R N I N G !!
================
This version does not yet properly delete individual hooks, it simply removes
the entire git hook. So if you already have a git hook set up, it
will be deleted when adding a new one so please back up your current hook 
*before* adding a new one. 

In future releases this will be addressed, but for now please do it manually.

 
