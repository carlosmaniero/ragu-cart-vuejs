const {ComponentsCompiler, createDefaultWebpackConfiguration, RaguServer} = require("ragu-server");
const path = require('path');

const init = async () => {
  const port = process.env.PORT || 3100;

  const config = {
    assetsPrefix: `http://localhost:${port}/component-assets/`,
    server: {
      assetsEndpoint: '/component-assets/'
    },
    components: {
      namePrefix: 'catalog',
      output: path.join(__dirname, 'component-assets'),
      sourceRoot: path.join(__dirname, 'components')
    },
    port,
    webpackConfig: createDefaultWebpackConfiguration({})
  };

  const compiler = new ComponentsCompiler(config);
  const server = new RaguServer(config, compiler);

  await compiler.compileAll();
  await server.start();
}

init();