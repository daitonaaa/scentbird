import url from 'urls';
import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import Layout from 'components/Layout';
import { Home, Error404 } from 'components/pages';


export default (
  <Route
    path={url.index}
    component={Layout}
    onEnter={forceTrailingSlash}
    onChange={forceTrailingSlashOnChange}
  >
    <IndexRoute component={Home} />

    <Route path={url.error404} component={Error404} />
    <Redirect from='*' to={url.error404} />
  </Route>
);


// Добавляем слеш в конец url
function forceTrailingSlash(nextState, replace) {
  const path = nextState.location.pathname;

  if (path.slice(-1) !== '/') {
    replace({
      ...nextState.location,
      pathname: path + '/'
    });
  }
}

function forceTrailingSlashOnChange(prevState, nextState, replace) {
  forceTrailingSlash(nextState, replace);
}
