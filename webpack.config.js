const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');

// HTMLファイルを動的に取得し、必要なバンドルを割り当てる
const htmlPlugins = glob.sync('./src/**/*.html').map((file) => {
  const filename = path.relative('./src', file);
  const chunks = filename.includes('result') ? ['result'] : ['simulation'];
  return new HtmlWebpackPlugin({
    filename,
    template: file,
    inject: 'body',
    chunks,
    scriptLoading: 'module',
    minify: false,
  });
});

module.exports = {
  mode: 'production',
  entry: {
    simulation: ['./src/js/utils.js', './src/js/common.js', './src/js/simulation.js', './src/css/simulation.css'],
    result: ['./src/js/utils.js', './src/js/common.js', './src/js/result.js', './src/css/result.css'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    hot: true,
    open: true,
    watchFiles: {
      paths: ['src/**/*.html', 'src/**/*.css', 'src/**/*.js'],
      options: {
        usePolling: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|webp|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    ...htmlPlugins,
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/images', to: 'images' }],
    }),
  ],
};
