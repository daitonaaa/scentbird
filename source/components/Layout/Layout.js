import React from 'react';
import CSSModules from 'react-css-modules';
import { Switch, Route } from 'react-router-dom';

import url from 'urls';
import styles from './Layout.scss';

import { Home } from 'components/pages';


const Layout = () => (
  <div styleName="layout">
    <div styleName="content">
      <Switch>
        <Route exact path={url.index} component={Home} />
      </Switch>
    </div>
  </div>
);

export default CSSModules(Layout, styles);
