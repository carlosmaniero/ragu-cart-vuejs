const domino = require("domino");
const {createVueRaguServerConfig} = require("ragu-vue-server-adapter/config");
const path = require('path');

const port = parseInt(process.env.PORT || '3101');

global.window = domino.createWindow();
global.document = window.document;

const assetsPrefix = process.env.HEROKU_APP_NAME ? `${process.env.HEROKU_APP_NAME}/component-assets/` : `http://localhost:${port}/component-assets/`;

module.exports = createVueRaguServerConfig({
  compiler: {
    assetsPrefix: assetsPrefix
  },
  server: {
    port
  },
  components: {
    namePrefix: 'ragu-vue-cart-app',
    sourceRoot: path.join(__dirname, 'src', 'ragu-components')
  }
});
