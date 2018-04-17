import React from 'react';
import CSSModules from 'react-css-modules';
import { Switch, Route } from 'react-router-dom';

import url from 'urls';
import styles from './Layout.scss';

import { Product } from 'components/pages';


const Layout = () => (
  <div styleName="layout">
    <div styleName="content">
      <div styleName="logo">
        <img src="http://test2.ortuna.ru/logo.jpg" alt="logo" />
      </div>
      <Switch>
        <Route exact path={url.product} component={Product} />
      </Switch>
    </div>
  </div>
);

export default CSSModules(Layout, styles);
