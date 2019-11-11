'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var stripAnsi = require('strip-ansi');
var table = require('text-table');
function isError(message) {
    if (message.fatal || message.severity === 2) {
        return true;
    }
    return false;
}
function formatter(results) {
    var output = '\n';
    var hasErrors = false;
    var reportContainsErrorRuleIDs = false;
    results.forEach(function (result) {
        var messages = result.messages;
        if (messages.length === 0) {
            return;
        }
        messages = messages.map(function (message) {
            var messageType;
            if (isError(message)) {
                messageType = 'error';
                hasErrors = true;
                if (message.ruleId) {
                    reportContainsErrorRuleIDs = true;
                }
            }
            else {
                messageType = 'warn';
            }
            var line = message.line || 0;
            if (message.column) {
                line += ':' + message.column;
            }
            var position = chalk_1.default.bold('Line ' + line + ':');
            return [
                '',
                position,
                messageType,
                message.message.replace(/\.$/, ''),
                chalk_1.default.underline(message.ruleId || ''),
            ];
        });
        if (hasErrors) {
            messages = messages.filter(function (m) { return m[2] === 'error'; });
        }
        messages.forEach(function (m) {
            m[4] = m[2] === 'error' ? chalk_1.default.red(m[4]) : chalk_1.default.yellow(m[4]);
            m.splice(2, 1);
        });
        var outputTable = table(messages, {
            align: ['l', 'l', 'l'],
            stringLength: function (str) {
                return stripAnsi(str).length;
            },
        });
        output += outputTable + "\n\n";
    });
    if (reportContainsErrorRuleIDs) {
        output +=
            'Search for the ' +
                chalk_1.default.underline(chalk_1.default.red('keywords')) +
                ' to learn more about each error.';
    }
    return output;
}
exports.formatter = formatter;
