import { Helmet } from 'react-helmet';
import React, { Component } from 'react';

import './Error404.scss';

export default class Error404 extends Component {
  render() {
    return (
      <div className="error-404">
        <Helmet>
          <title>404</title>
        </Helmet>

        Ошибочка 404, друг мой..
      </div>
    );
  }
}
