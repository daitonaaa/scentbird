import webpack from 'webpack';
import Config from 'webpack-config';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const plugins = [

  // Анализирует стили
  new StyleLintPlugin({
    configFile: '.stylelintrc',
    context: 'source',
    files: '**/*.scss',
    failOnError: false,
    quiet: false,
  }),

  // Горячая перезагрузка
  new webpack.HotModuleReplacementPlugin(),

  // Улучшенное наименование модулей
  new webpack.NamedModulesPlugin(),

  // Показываем прогресс бар
  new ProgressBarPlugin(),

  // Визуальный анализатор доступный по :8888 порту
  // Включить, если нужно посмотреть размеры модулей
  // new BundleAnalyzerPlugin()
];

export default new Config().extend('config/webpack.base.config.js').merge({
  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true',
      'react-hot-loader/patch',
      './client.js'
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  plugins
});
