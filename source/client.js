import 'babel-polyfill';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'configureStore.js';
import { ConnectedRouter } from 'react-router-redux';
import createBrowserHistory  from 'history/createBrowserHistory';

import 'scss/common.scss';

import Layout from 'components/Layout';

// Базовый url для запросов клиента
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'prod-api-url'
  : 'dev-api-url';

const history = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
