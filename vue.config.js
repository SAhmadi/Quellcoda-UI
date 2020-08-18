const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
//const path = require('path');

module.exports = {
  // assetsDir: '../../static/vue', // relative to outputDir

  // publicPath: '',

  // outputDir: '../../../templates/vue',

  // runtimeCompiler: undefined,
  // productionSourceMap: undefined,
  // parallel: undefined,
  // css: undefined

  // Needed for CORS
  /*devServer: {
    proxy: 'https://ba-serverless-testing-t6e6p4w6oa-ew.a.run.app/',
  },*/

  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        languages: ['java']
      })
    ]
  },
};