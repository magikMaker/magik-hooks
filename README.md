magik-hooks
===========
[![NPM version](https://badge.fury.io/js/magik-hooks.svg)](http://badge.fury.io/js/magik-hooks)

Tiny utility to manage [git hooks](https://git-scm.com/docs/githooks) 
using [Node.js](http://nodejs.org/). It can create, update or remove a git hook. 

Install
-------
Install this in your project like this:
```bash
$ npm install --save-dev magik-hooks
```

Usage
-----
After installation, you can use this package in your code like this:
```js
// require magik-hooks so it's available
const magikHooks = require('magik-hooks');

// create a new hook, assuming the variable `commands` holds the actual 
// commands as a string. Optionally provide an `identifier` so the hook can be 
// removed easily at a later time. (In case you're running multiple scripts 
//from one git hook
magikHooks.create('pre-commit', commands[, identifier]);

// removes a hook, optionally provide an identifier so only that particular 
// hook will be removed.
magikHooks.remove('pre-commit'[, identifier]);

```

Uninstall
---------
To uninstall, simply type this on the command line:
```bash
$ npm uninstall --save-dev magik-hooks
```

License
=======

```text
Copyright (C) 2016 Bjørn Wikkeling (magikMaker)


Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
of the Software, and to permit persons to whom the Software is furnished to do 
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
THE AUTHORS OR COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
SOFTWARE.

Except as contained in this notice, the name(s) of the above copyright holders 
shall not be used in advertising or otherwise to promote the sale, use or other 
dealings in this Software without prior written authorization.
