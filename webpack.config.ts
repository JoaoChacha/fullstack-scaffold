import { resolve } from 'path'
import { NamedModulesPlugin, Configuration} from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
const NodemonPlugin = require('nodemon-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV = '' } = process.env;

const common: Configuration =  {
  // @ts-ignore
  mode:  NODE_ENV || 'development',
  devtool: 'inline-source-map',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
}

const frontend: Configuration = {
  ...common,
  name: 'frontend',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  entry: './src/',
  output: {
    filename: '[name].[hash].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    port: 8080,
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new NamedModulesPlugin(),
    new HtmlWebpackPlugin({ template: resolve(__dirname, 'src/index.html') }),
  ],
}

const backend: Configuration = {
  ...common,
  name: 'backend',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  entry: './src/server',
  output: {
    filename: 'server.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ]
  },
  target: 'node',
  plugins: [
    new NodemonPlugin(),
  ]
}

export default [frontend, backend]