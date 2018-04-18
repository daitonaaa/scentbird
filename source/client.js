import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'configureStore.js';
import { ConnectedRouter } from 'react-router-redux';
import createBrowserHistory  from 'history/createBrowserHistory';

import Layout from 'components/Layout';

import 'scss/common.scss';


const history = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('SCENTBRID')
);
