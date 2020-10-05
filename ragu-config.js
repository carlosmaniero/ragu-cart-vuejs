const {VueComponentResolver} = require("ragu-vue-server-adapter/component-resolver");
const {merge} = require("webpack-merge");
const domino = require("domino");
const {raguVueWebpackViewConfig, raguVueWebpackHydrateConfig} = require('ragu-vue-server-adapter/webpack');

const path = require("path");
const port = parseInt(process.env.PORT || '3101');

global.window = domino.createWindow();
global.document = window.document;

const assetsPrefix = process.env.HEROKU_APP_NAME ? `${process.env.HEROKU_APP_NAME}/component-assets/` : `http://localhost:${port}/component-assets/`;

const config = {
  server: {
    port,
    routes: {
      assets: '/component-assets/'
    },
    previewEnabled: true
  },
  compiler: {
    assetsPrefix: assetsPrefix,
    watchMode: process.env.WATCH_MODE === 'true',
    webpack: {
      view: raguVueWebpackViewConfig(assetsPrefix),
      hydrate: merge(
        raguVueWebpackHydrateConfig(assetsPrefix),
        {
          resolve: {
            modules: [path.resolve(__dirname, 'node_modules')]
          }
        }
      ),
    },
    output: {
      view: path.join(__dirname, 'compiled/view_components'),
      hydrate: path.join(__dirname, 'compiled/hydrate_components')
    }
  },
  components: {
    namePrefix: 'ragu-vue-cart-app',
    sourceRoot: path.join(__dirname, 'src', 'ragu-components'),
    defaultDependencies: [
      {
        nodeRequire: 'vue',
        globalVariable: 'Vue',
        dependency: 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js'
      }
    ]
  },
};

config.components.resolver = new VueComponentResolver(config);

module.exports = config;
