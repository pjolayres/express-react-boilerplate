const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicConfig = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: [
    './src/client/index.js'
  ],
  output: {
    filename: 'scripts.js',
    chunkFilename: '[name].[id].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [
                  {
                    removeTitle: true
                  }
                ],
                floatPrecision: 2
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/client/index.html',
      filename: './index.html'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      sourceMap: true,
      terserOptions: {
        mangle: true,
        ie8: false,
        keep_fnames: true
      }
    })],
    noEmitOnErrors: true,
    occurrenceOrder: true,
    splitChunks: {
      name: 'vendors',
      chunks: 'all'
    }
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  externals: {
    jquery: 'jQuery'
  },
  devtool: 'source-map',
  mode: 'production'
};

module.exports = publicConfig;
