//
// Webpack config for Spellbook extension
//
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const sass = require('dart-sass')

const devMode = process.env.NODE_ENV !== 'production'
const styleLoader = (devMode ? 'style-loader' : MiniCssExtractPlugin.loader)

const config = {
  entry: {
    background: './src/background.js',
    popup: './src/popup.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.tag$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'riot-tag-loader',
          options: {
            hot: false, // set it to true if you are using hmr
            type: 'es6',
            // add here all the other riot-compiler options riot.js.org/guide/compiler/
            // template: 'pug' for example
            sourcemap: false,
          },
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: styleLoader },
          { loader: 'css-loader' },
          { loader: 'sass-loader',
            options: {
              implementation: sass
            }
          },
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/manifest.json' },
      { from: 'src/background.html' },
      { from: 'src/popup.html' },
      { from: 'src/icon.png' },
    ]),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
  ],
  // resolve: {
  //   alias: {
  //     'kefir$': './vendor/kefir/dist/kefir.js',
  //   },
  //   extensions: [".js", ".json", ".tag"],
  // }
}

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'source-map'
  }

  if (argv.mode === 'production') {
  }

  return config
}
