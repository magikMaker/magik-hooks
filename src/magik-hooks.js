/**
 * Handles the creates and removal of Git hooks
 */
var exec = require( 'child_process' ).execSync;
var fs = require('fs');
var gitHooks = require('./git-hooks');
var path = require('path');

var gitHooksDirectory;
var encoding = 'utf8';
var shebang = '#!/bin/sh';

var ANSI_RESET = '\x1b[0m';
var ANSI_COLOURS = {
    BLACK: '\x1b[30m',
    BLUE: '\x1b[34m',
    CYAN: '\x1b[36m',
    DEFAULT: '\x1b[0m',
    GREEN: '\x1b[32m',
    MAGENTA: '\x1b[35m',
    RED: '\x1b[31m',
    WHITE: '\x1b[37m',
    YELLOW: '\x1b[33m'
};

/**
 * Returns a Boolean indicating whether or not the file already has a
 * magikHook definition
 *
 * @access private
 * @param filePath the path to the file on disk
 * @param id
 * @returns {boolean}
 */
function hasMagikHook(filePath, id) {
    var regex = new RegExp(escapeRegExp(getMagikHookCommentStart(id)), 'gi');
    var fileContent = fs.readFileSync(filePath, encoding);
    return fileContent && regex.test(fileContent);
}

/**
 * Escapes a string so it can be used in a regular Expression
 *
 * @access private
 * @param s
 * @returns {string}
 */
function escapeRegExp(s) {
    // return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

/**
 * Removes the magikHook, identified by optional `id` argument, from fileName
 *
 * @access private
 * @param {string} filePath the path of the hook file
 * @param {string} [id] optionally provide an identifier
 */
function removeMagikHook(filePath, id){
    var regex = new RegExp(
        '^\n*' + escapeRegExp(getMagikHookCommentStart(id)) + '(?:.|\n)+?' + escapeRegExp(getMagikHookCommentEnd(id)) + '$',
        'im'
    );

    var fileContent = fs.readFileSync(filePath, encoding);
    fileContent = fileContent.replace(regex, '');

    if(fileContent.trim() == shebang){
        fs.unlinkSync(filePath);
    } else {
        writeFile(filePath, fileContent);
    }
}

/**
 * Returns the .git hooks directory by calling the provided callback
 * function, if the hooks directory doesn't exists, it will be created.
 *
 * @access private
 * @returns {string} the path to the Git Hooks directory
 */
function getGitHooksDirectory() {

    if(!gitHooksDirectory) {

        var responseObject;

        try{
            responseObject = exec('git rev-parse --git-dir');
        }
        catch(e){
            process.stdout.write(`${ANSI_COLOURS.RED}Error while trying to retreive the Git Hooks folder:\n${e.toString(), ANSI_RESET}\r\n`);
            process.exit(1);
        }

        gitHooksDirectory = path.join(responseObject.toString().trim(), 'hooks');

        if(!fs.existsSync(gitHooksDirectory)) {
            fs.mkdirSync(gitHooksDirectory);
        }
    }

    return gitHooksDirectory;
}

/**
 * Writes a file to disc
 *
 * @access private
 * @param {string} fileName the path to the file to write the data to
 * @param {string} data the data to write to the file
 * @returns {void}
 */
function writeFile(fileName, data) {
    fs.writeFileSync(fileName, data);
    fs.chmodSync(fileName, 0755);
}

/**
 * Appends `data` to the file located at `fileName`
 *
 * @access private
 * @param {string} fileName the path to the file to append the data to
 * @param {string} data the data to write to the file
 * @returns {void}
 */
function appendFile(fileName, data){
    fs.appendFileSync(fileName, data);
    fs.chmodSync(fileName, 0755);
}

/**
 * Returns a boolean indicating whether `testArray` contains `testValue`
 *
 * @access private
 * @param testArray
 * @param testValue
 * @returns {boolean}
 */
function inArray(testArray, testValue) {
    return testArray.some(function(value) {
        return testValue === value;
    });
}

/**
 *
 * @access private
 * @param hook
 * @returns {string} the file path
 */
function getFilePathFromHook(hook) {

    if(!inArray(gitHooks, hook)) {
        process.stdout.write(`${ANSI_COLOURS.RED}Error: '${hook}' is not a valid Git hook.\n\rValid hooks: ${gitHooks.join(', '), ANSI_RESET}\r\n`);
        process.exit(1);
    } else {
        return path.join(getGitHooksDirectory(), hook);
    }
}

/**
 * Returns the magik-hook starting identifier
 *
 * @access private
 * @param [id] the identifier of this hook
 * @returns {string}
 */
function getMagikHookCommentStart(id){
    return id ? '#magik-hook:' + id : '#magik-hook';
}

/**
 * Retruns the magik-hook ending identifier
 *
 * @access private
 * @param [id]
 * @returns {string}
 */
function getMagikHookCommentEnd(id){
    return id ? '#//magik-hook:' + id : '#//magik-hook';
}

/**
 * Export the actual MagikHooks object
 *
 * @type {{create: module.exports.create, remove: module.exports.remove}}
 */
module.exports = {

    /**
     * Creates a Git Hook
     *
     * @access public
     * @param directory
     * @param name
     * @param cmd
     */
    create: function(hook, commands, id) {
        var filePath = getFilePathFromHook(hook);
        var lines = [];
        lines.push('');
        lines.push(getMagikHookCommentStart(id));
        lines.push(commands);
        lines.push(getMagikHookCommentEnd(id));

        if(fs.existsSync(filePath) && hasMagikHook(filePath, id)) {
            removeMagikHook(filePath, id);
        }

        // console.log('ffff', fs.existsSync(filePath),filePath, lines);

        if(fs.existsSync(filePath)) {
            appendFile(filePath, lines.join('\n'));
        } else {
            lines.unshift(shebang);
            writeFile(filePath, lines.join('\n'));
        }
    },

    /**
     * Removes a hook from a git hook file.
     *
     * @access public
     * @param directory
     * @param name
     */
    remove: function(hook, id) {
        var filePath = path.join(getGitHooksDirectory(), hook);

        if(fs.existsSync(filePath) && hasMagikHook(filePath, id)) {
            removeMagikHook(filePath, id);
        }
    }
};
