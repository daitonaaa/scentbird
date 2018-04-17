import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';

import { Input } from 'components/common';


export class Home extends Component {

  static propTypes = {
    request: PropTypes.bool.isRequired,

    // getItemsList: PropTypes.func.isRequired,
  };

  state = {
    value: ''
  }

  componentDidMount() {

  }

  render() {
    const { request } = this.props;

    return (
      <div className={classNames('home', { request })}>
        <Helmet><title>Пример кода</title></Helmet>
        <Input
          title="Тестовый инпут"
          error="error text"
          value={this.state.value}
          onChange={value => this.setState({ value })}
        />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  ...state.items,
});

const mapDispatchToProps = {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
