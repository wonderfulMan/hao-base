"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var NodeNotifier = require("node-notifier");
function setConsoleMessageByMode(webpackConfig) {
    var options = {
        compilationSuccessInfo: {
            messages: [webpackConfig.mode === 'production' ? '应用构建中...' : '当前程序运行端口'],
            notes: []
        },
        onErrors: function (severity, errors) {
            if (severity !== 'error') {
                return;
            }
            var error = errors[0];
            NodeNotifier.notify({
                title: "构建错误：",
                icon: path.resolve(__dirname, '../static/image/error.png'),
                message: severity + ': ' + error.name,
                subtitle: error.file || '',
            });
        }
    };
    return options;
}
exports.setConsoleMessageByMode = setConsoleMessageByMode;
function setCompilerInfoToWindow(webpackConfig) {
    var message = webpackConfig.mode === 'production' ? '构建成功，编译文件路径为dist' : '启动成功';
    NodeNotifier.notify({
        title: '提示：',
        icon: path.resolve(__dirname, '../static/image/success.png'),
        wait: false,
        message: message
    });
}
exports.setCompilerInfoToWindow = setCompilerInfoToWindow;
