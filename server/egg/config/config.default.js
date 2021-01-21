/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

const dist = '../../dist';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo, appConfig = {}) => {
  const assetsDir =
    (appConfig.assets && appConfig.assets.assetsDir) || `${dist}`;
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611196797796_8800';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    assets: {
      publicPath: '/public',
      devServer: {
        command: 'umi dev',
        env: {
          APP_ROOT: path.join(appInfo.baseDir, assetsDir),
          PORT: '{port}',
          BROWSER: 'none',
          ESLINT: 'none',
          SOCKET_SERVER: 'http://127.0.0.1:{port}',
          PUBLIC_PATH: 'http://127.0.0.1:{port}',
        },
      },
    },
    view: {
      mapping: {
        '.html': 'nunjucks',
      },
      defaultViewEngine: 'nunjucks',
    },
    proxy: true,
    security: {
      csrf: false,
      xframe: {
        enable: false,
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
