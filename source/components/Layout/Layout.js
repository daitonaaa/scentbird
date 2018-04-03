import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './Layout.scss';
import url from 'urls';

import { Home, Error404 } from 'components/pages';


const Layout = () => (
  <div className="layout">
    <div className="content">
      <Switch>
        <Route exact path={url.index} component={Home} />
        <Route component={Error404} />
      </Switch>
    </div>
  </div>
);

export default Layout;
