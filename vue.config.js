const path = require('path');

const PrettierPlugin = require('prettier-webpack-plugin');
const prettierConfig = require('./.prettierrc.json');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

console.log(`build mode: ${process.env.NODE_ENV}`);

module.exports = {
  outputDir: path.resolve(__dirname, 'dist'),
  publicPath: '/',

  css: {
    extract: true,
  },

  filenameHashing: true,

  chainWebpack: (config) => {
    config
      .plugin('clean')
      .use(CleanWebpackPlugin)
      .end()
      .plugin('prettier')
      .use(PrettierPlugin, [prettierConfig])
      .end();
  },
};
