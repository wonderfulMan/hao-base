
import * as path from 'path';
import * as webpack from 'webpack';
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import * as NodeNotifier from 'node-notifier';
/**
 * 根据模式命令行输出不同信息
 * @param webpackConfig webpack配置
 */
export function setConsoleMessageByMode(webpackConfig: webpack.Configuration) {
  const options: FriendlyErrorsWebpackPlugin.Options = {
    compilationSuccessInfo: {
      messages: ['应用构建中...'],
      notes: []
    },
    onErrors(severity: FriendlyErrorsWebpackPlugin.Severity, errors: string) {
      if (severity !== 'error') {
        return;
      }
      const error = errors[0] as any;
      NodeNotifier.notify({
        title: "构建错误：",
        icon: path.resolve(__dirname, '../static/image/error.png'),
        message: severity + ': ' + error.name,
        subtitle: error.file || '',
      });
    }
  }
  return options
}


/**
 * 编译成功后提示窗口推送
 * @param webpackConfig webpack配置
 */
export function setCompilerInfoToWindow(webpackConfig: webpack.Configuration) {
  const message = webpackConfig.mode === 'production' ? '构建成功，编译文件路径为dist' : '启动成功'
  NodeNotifier.notify({
    title: '提示：',
    icon: path.resolve(__dirname, '../static/image/success.png'),
    wait: false,
    message
  });
}