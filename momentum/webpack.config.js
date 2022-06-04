const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname,'src'),
  mode: 'development',
  entry: {
    main: './index.js',
    applications: './applications.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  }, 
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: { minimize: false}
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: [
          //       '/style/vars.scss',
          //     ]
          //   }
          // }
        ]
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
      new HTMLWebpackPlugin({
        template: './index.html',
    }),
      new CopyPlugin({
        patterns: [
          { from: "components/player/assets/sounds",
            to: "assets/sounds"
          },
        ]
      })
  ],
  devServer: {
    port: 5000,
  },
}