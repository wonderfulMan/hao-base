'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var os = require('os');
var codeFrame = require('@babel/code-frame').codeFrameColumns;
var chalk = require('chalk');
var fs = require('fs');
function tsFormatter(message, useColors) {
    var hasGetters = typeof message.getFile === 'function';
    var colors = new chalk.constructor({ enabled: useColors });
    var messageColor = message.isWarningSeverity() ? colors.yellow : colors.red;
    var source;
    if (hasGetters) {
        source =
            message.getFile() &&
                fs.existsSync(message.getFile()) &&
                fs.readFileSync(message.getFile(), 'utf-8');
    }
    else {
        source =
            message.file &&
                fs.existsSync(message.file) &&
                fs.readFileSync(message.file, 'utf-8');
    }
    var frame = '';
    if (source) {
        frame = codeFrame(source, { start: { line: message.line, column: message.character } }, { highlightCode: useColors })
            .split('\n')
            .map(function (str) { return '  ' + str; })
            .join(os.EOL);
    }
    var severity = hasGetters ? message.getSeverity() : message.severity;
    var types = { diagnostic: 'TypeScript', lint: 'TSLint' };
    return [
        messageColor.bold(types[message.type] + " " + severity.toLowerCase() + ": ") +
            (hasGetters ? message.getContent() : message.content) +
            '  ' +
            messageColor.underline((message.type === 'lint' ? 'Rule: ' : 'TS') + message.code),
        '',
        frame,
    ].join(os.EOL);
}
exports.tsFormatter = tsFormatter;
