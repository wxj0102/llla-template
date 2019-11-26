'use strict';

// Do this as the first thing so that any code reading it knows the right env.
// process 是一个node全局变量
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.

// unhandledRejection事件 未处理的promise拒绝被抛出 则会触发该事件
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.

// 获取配置
require('../config/env');

// fs模块
const fs = require('fs');

// react相关工具 大概是控制台输出用的
const chalk = require('react-dev-utils/chalk');

// webpack
const webpack = require('webpack');

//本地服务相关的一个工具 可以用来启一个本地服务
const WebpackDevServer = require('webpack-dev-server');

// react相关工具
const clearConsole = require('react-dev-utils/clearConsole');

// react相关工具
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

// react相关工具
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');

// react相关工具
const openBrowser = require('react-dev-utils/openBrowser');

// 获取路径配置
const paths = require('../config/paths');

// 获取webpack配置
const configFactory = require('../config/webpack.config');

// 开发环境配置
const createDevServerConfig = require('../config/webpackDevServer.config');

// yarn.lock 路径
const useYarn = fs.existsSync(paths.yarnLockFile);

// 是否是TTY TTY好像是只一个终端窗口
const isInteractive = process.stdout.isTTY;

// Warn and crash if required files are missing
// 如果缺少所需文件，则警告并崩溃
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// Tools like Cloud9 rely on this.

// 端口号 10进制 默认3000
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;

// host 默认0.0.0.0
// 这个端口号不知道是什么 是刚刚导进去的
const HOST = process.env.HOST || '0.0.0.0';

// 如果改过host 则发一个警告 不知道是干嘛的....
if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  );
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  );
  console.log(
    `Learn more here: ${chalk.yellow('https://bit.ly/CRA-advanced-config')}`
  );
  console.log();
}

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
// 检查浏览器相关??? 不知道干嘛的啊
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    // We attempt to use the default port but if it is busy, we offer the user to
    // run on a different port. `choosePort()` Promise resolves to the next free port.

    // 当端口被占用 则提示开一个新端口... 
    return choosePort(HOST, DEFAULT_PORT);
  })
  .then(port => {
    if (port == null) {
      // We have not found a port.
      return;
    }
    const config = configFactory('development');
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const appName = require(paths.appPackageJson).name;
    const useTypeScript = fs.existsSync(paths.appTsConfig);
    const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true';
    const urls = prepareUrls(protocol, HOST, port);
    const devSocket = {
      warnings: warnings =>
        devServer.sockWrite(devServer.sockets, 'warnings', warnings),
      errors: errors =>
        devServer.sockWrite(devServer.sockets, 'errors', errors),
    };
    // Create a webpack compiler that is configured with custom messages.
    const compiler = createCompiler({
      appName,
      config,
      devSocket,
      urls,
      useYarn,
      useTypeScript,
      tscCompileOnError,
      webpack,
    });
    // Load proxy config
    const proxySetting = require(paths.appPackageJson).proxy;
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
    // Serve webpack assets generated by the compiler over a web server.
    const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig
    );
    const devServer = new WebpackDevServer(compiler, serverConfig);
    // Launch WebpackDevServer.
    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        clearConsole();
      }

      // We used to support resolving modules according to `NODE_PATH`.
      // This now has been deprecated in favor of jsconfig/tsconfig.json
      // This lets you use absolute paths in imports inside large monorepos:
      if (process.env.NODE_PATH) {
        console.log(
          chalk.yellow(
            'Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app.'
          )
        );
        console.log();
      }

      console.log(chalk.cyan('Starting the development server...\n'));
      openBrowser(urls.localUrlForBrowser);
    });

    ['SIGINT', 'SIGTERM'].forEach(function(sig) {
      process.on(sig, function() {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
