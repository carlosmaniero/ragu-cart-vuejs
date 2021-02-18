const domino = require("domino");
const {createVueRaguServerConfig} = require("ragu-vue-server-adapter/config");
const path = require('path');

const port = parseInt(process.env.PORT || '3101');

global.window = domino.createWindow();
global.document = window.document;

const baseurl = process.env.HEROKU_APP_NAME ? process.env.HEROKU_APP_NAME : `http://localhost:${port}`;
const assetsPrefix = `${baseurl}/component-assets/`;

module.exports = createVueRaguServerConfig({
  baseurl,
  compiler: {
    assetsPrefix: assetsPrefix
  },
  server: {
    port
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
  }
});
