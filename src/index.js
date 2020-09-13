const {merge} = require("webpack-merge");
const domino = require("domino");

const {ComponentsCompiler, createDefaultWebpackConfiguration, RaguServer} = require("ragu-server");
const path = require('path');

global.window = domino.createWindow();
global.document = window.document;

const getAssetsPrefix = (port) => {
  return process.env.HEROKU_APP_NAME ? `${process.env.HEROKU_APP_NAME}` : `http://localhost:${port}`;
}

const init = async () => {
  const port = process.env.PORT || 3100;

  const config = {
    assetsPrefix: `${getAssetsPrefix(port)}/component-assets/`,
    server: {
      assetsEndpoint: '/component-assets/'
    },
    components: {
      namePrefix: 'cart',
      preCompiledOutput: path.join(__dirname, 'pre_compiled_components'),
      output: path.join(__dirname, 'component-assets'),
      sourceRoot: path.join(__dirname, 'components')
    },
    port,
    webpackPreCompilerConfiguration: merge(
      createDefaultWebpackConfiguration({}),
      {
        target: 'node',
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        "targets": {
                          "node": "current"
                        }
                      }
                    ]
                  ]
                }
              }
            }
          ]
        },
        output: {
          filename: '[name].js',
          publicPath: '/'
        },
      }
    ),
    webpackConfig: createDefaultWebpackConfiguration({})
  };

  const compiler = new ComponentsCompiler(config);
  const server = new RaguServer(config, compiler);

  await compiler.compileAll();
  await server.start();
}

init();
