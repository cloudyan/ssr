/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo, appConfig = {}) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    logger: {
      level: 'NONE',
      consoleLevel: 'DEBUG',
    },
    assets: {
      devServer: {
        debug: true,
        autoPort: true,
      },
      dynamicLocalIP: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
