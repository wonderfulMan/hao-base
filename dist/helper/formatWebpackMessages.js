'use strict';
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require('chalk');
var friendlySyntaxErrorLabel = 'Syntax error:';
function isLikelyASyntaxError(message) {
    return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}
function formatMessage(message, isError) {
    var lines = message.split('\n');
    lines = lines.filter(function (line) { return !/Module [A-z ]+\(from/.test(line); });
    lines = lines.map(function (line) {
        var parsingError = /Line (\d+):(?:(\d+):)?\s*Parsing error: (.+)$/.exec(line);
        if (!parsingError) {
            return line;
        }
        var _a = __read(parsingError, 4), errorLine = _a[1], errorColumn = _a[2], errorMessage = _a[3];
        return friendlySyntaxErrorLabel + " " + errorMessage + " (" + errorLine + ":" + errorColumn + ")";
    });
    message = lines.join('\n');
    message = message.replace(/SyntaxError\s+\((\d+):(\d+)\)\s*(.+?)\n/g, friendlySyntaxErrorLabel + " $3 ($1:$2)\n");
    message = message.replace(/Line (\d+):\d+:/g, 'Line $1:');
    message = message.replace(/^.*export '(.+?)' was not found in '(.+?)'.*$/gm, "Attempted import error: '$1' is not exported from '$2'.");
    message = message.replace(/^.*export 'default' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm, "Attempted import error: '$2' does not contain a default export (imported as '$1').");
    message = message.replace(/^.*export '(.+?)' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm, "Attempted import error: '$1' is not exported from '$3' (imported as '$2').");
    lines = message.split('\n');
    if (lines.length > 2 && lines[1].trim() === '') {
        lines.splice(1, 1);
    }
    lines[0] = lines[0].replace(/^(.*) \d+:\d+-\d+$/, '$1');
    if (lines[1] && lines[1].indexOf('Module not found: ') === 0) {
        lines = [
            lines[0],
            lines[1]
                .replace('Error: ', '')
                .replace('Module not found: Cannot find file:', 'Cannot find file:'),
        ];
    }
    if (lines[1] && lines[1].match(/Cannot find module.+node-sass/)) {
        lines[1] = 'To import Sass files, you first need to install node-sass.\n';
        lines[1] +=
            'Run `npm install node-sass` or `yarn add node-sass` inside your workspace.';
    }
    lines[0] = chalk.inverse(lines[0]);
    message = lines.join('\n');
    message = message.replace(/^\s*at\s((?!webpack:).)*:\d+:\d+[\s)]*(\n|$)/gm, '');
    message = message.replace(/^\s*at\s<anonymous>(\n|$)/gm, '');
    lines = message.split('\n');
    lines = lines.filter(function (line, index, arr) {
        return index === 0 || line.trim() !== '' || line.trim() !== arr[index - 1].trim();
    });
    message = lines.join('\n');
    return message.trim();
}
function formatWebpackMessages(json) {
    var formattedErrors = json.errors.map(function (message) {
        return formatMessage(message, true);
    });
    var formattedWarnings = json.warnings.map(function (message) {
        return formatMessage(message, false);
    });
    var result = { errors: formattedErrors, warnings: formattedWarnings };
    if (result.errors.some(isLikelyASyntaxError)) {
        result.errors = result.errors.filter(isLikelyASyntaxError);
    }
    return result;
}
exports.formatWebpackMessages = formatWebpackMessages;
