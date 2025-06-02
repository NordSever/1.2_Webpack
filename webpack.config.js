
const path = require('node:path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const isProduction = process.env.NODE_ENV === 'production';
// const isDevelopment =  process.argv.includes('--mode=development') || process.env.NODE_ENV === 'development';

module.exports = (env, argv) => {
  const mode = argv.mode || 'production';
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },

    mode: mode,
    devServer: {
      // hot: true,
      watchFiles: ['./src/index.html'],
      liveReload: true,
    },
    
    devtool: mode === 'production' ? 'nosources-source-map' : 'eval-source-map',

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
          loader: 'babel-loader',
          },
        },
        {
          test: /\.html$/,
          use: [
          {
            loader: 'html-loader',
          },
          ],
        },
        {
          test: /\.css$/i,
          use: [mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext]',
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        }
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html',
        cache: false,
        favicon: './src/favicon.ico',
      }),
      ...(mode === 'production' ? [new MiniCssExtractPlugin()] : [] ),
    ]
  };
}

  
  
