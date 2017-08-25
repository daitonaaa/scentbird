import PropTypes from 'prop-types';
import React, { Component } from 'react';


export default class Layout extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    require('./Layout.scss');

    return (
      <div className="layout">
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
