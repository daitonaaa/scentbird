import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';

import './Home.scss';

import Controls from 'components/Controls';
import ItemsList from 'components/ItemsList';
import CreateForm from 'components/CreateForm';

import { getItemsList } from 'actions/items';


class Home extends Component {

  static propTypes = {
    request: PropTypes.bool.isRequired,
    errorText: PropTypes.string.isRequired,

    getItemsList: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getItemsList();
  }

  renderError() {
    const { errorText } = this.props;

    if (typeof errorText === 'string' && errorText.length) {
      return (
        <div className="items-list__error">
          {errorText}
        </div>
      );
    }
  }

  renderHeader() {
    return (
      <div className="home__header">
        <div className="home__header-title">
          Пример mini приложения на <span>React.js</span>
        </div>
        <div className="home__header-hint">
          <span>
            Код приложения можно посмотреть тут:
          </span>
          <a href="https://github.com/Cast0001/code-example" target="_blank">
            GitHub
          </a>
        </div>
      </div>
    );
  }

  render() {
    const { request } = this.props;

    return (
      <div className={classNames('home', { request })}>
        <Helmet><title>Пример кода</title></Helmet>
        {this.renderError()}
        {this.renderHeader()}
        <div className="home__content">
          <div className="home__content-left">
            <Controls />
          </div>
          <div className="home__content-right">
            <ItemsList />
          </div>
        </div>
        <CreateForm />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  ...state.items,
});

const mapDispatchToProps = {
  getItemsList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
