const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname,'src'),
  mode: 'development',
  entry: {
    main: './index.js',
    applications: './applications.js',
  },
  output: {
    filename: '[name].bundle.js',
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
        test: /\.(png|jpg|gif|mp3|ico)$/,
        type: 'asset/resource',
        test: /\.svg/,
        type: 'asset/inline',
      },
    ]
  },
  plugins: [
      new HTMLWebpackPlugin({
        template: './index.html',
    }),
  ],
  devServer: {
    port: 5000,
  },
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, 'src/assets/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Utils: path.resolve(__dirname, 'src/utils/'),
    }
  }
}