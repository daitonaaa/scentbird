import webpack from 'webpack';
import Config from 'webpack-config';

const plugins = [

  // Не собирет проект с ошибками
  new webpack.NoEmitOnErrorsPlugin(),

  // Адаптирует css (минифицирует на prod)
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),

  // Минифицирует JS
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true
    },
    output: {
      comments: false,
    },
  }),

  // Создаём переменную внутри приложения
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
];

export default new Config().extend('config/webpack.base.config.js').merge({
  entry: {
    app: ['babel-polyfill', './client.js']
  },
  devtool: 'source-map',
  plugins
});
