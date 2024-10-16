const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');

// 動的にHTMLファイルを読み込む設定
const htmlPlugins = glob
  .sync('./src/**/*.html') // サブディレクトリ含む
  .concat(glob.sync('./src/*.html')) // 直下のファイルも対象に
  .map(
    (file) =>
      new HtmlWebpackPlugin({
        filename: path.relative('./src', file),
        template: file,
        inject: 'body',
      }),
  );

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
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
      paths: ['src/**/*.html'],
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
      filename: 'style.css',
    }),
    ...htmlPlugins,
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/images', to: 'images' }],
    }),
  ],
};
