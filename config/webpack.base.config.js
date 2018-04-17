import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';
import Config from 'webpack-config';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const plugins = [

  // Улучшает сборку
  new HappyPack({
    loaders: ['babel-loader']
  }),

  // Создаёт manifest файл с путями к собранным файлам
  new ManifestPlugin(),

  // Сливает и объединяет общие куски кода
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.js'
  }),

  // Генерирует файл HTML
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '/../source', 'index.html'),
    inject: 'body'
  }),

  // Адаптирует css
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({
          browsers: [
            'last 3 version',
            'ie >= 10',
          ],
        }),
      ],
      context: path.join(__dirname, '/../source'),
    },
  }),

  // Формирует CSS
  new ExtractTextPlugin({
    filename: 'styles.css',
    allChunks: true,

    // Убираем в режиме dev, чтоб работал HMR с scss
    disable: process.env.NODE_ENV !== 'production'
  })
];


const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: ['happypack/loader']
  },

  {
    test: /\.(png|gif|jpg)$/,
    include: path.join(__dirname, '/../source/assets/images'),
    use: 'file-loader?name=assets/images/[name]-[hash].[ext]',
  },

  {
    test: /\.(eot|woff|woff2|ttf)$/,
    include: path.join(__dirname, '/../source/assets/fonts'),
    use: 'url-loader?name=assets/fonts/[name]-[hash].[ext]'
  },

  {
    test: /\.scss$/,
    loaders: [
      'style-loader',
      'css-loader?modules&camelCase&importLoaders=1&localIdentName=[name]-[local]__[hash:base64:5]',
      'resolve-url-loader',
      'sass-loader'
    ]
  }
];


export default new Config().merge({

  context: path.join(__dirname, '/../source'),

  entry: {
    vendor: [
      'babel-polyfill',
      'es6-promise',
      'immutable',
      'isomorphic-fetch',
      'react-dom',
      'react-redux',
      'react-router',
      'react',
      'redux-thunk',
      'redux',
    ]
  },

  output: {
    path: path.join(__dirname, '/../build'),
    sourceMapFilename: '[file].map',
    filename: 'app.js',
  },

  module: {
    rules
  },

  plugins,

  resolve: {

    alias: {
      'images': path.join(__dirname, '/../source/assets/images'),
      'vars.scss': path.join(__dirname, '/../source/scss/_vars.scss'),
      'sprite.scss': path.join(__dirname, '/../source/scss/_sprite.scss'),
      'mixins.scss': path.join(__dirname, '/../source/scss/_mixins.scss'),
    },

    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.scss'],

    modules: [
      path.join(__dirname, '/../source'), 'node_modules'
    ],
  },
});
