import 'babel-polyfill';
import axios from 'axios';
import React from 'react';
import routes from 'routes';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'configureStore.js';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import 'scss/common.scss';

// Базовый url для запросов клиента
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'prod-api-url'
  : 'dev-api-url';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router
      routes={routes}
      history={history}
    />
  </Provider>,
  document.getElementById('app')
);
