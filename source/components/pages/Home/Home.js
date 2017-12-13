import PropTypes from 'prop-types';
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
    count: PropTypes.number.isRequired,
    errorText: PropTypes.string.isRequired,

    getItemsList: PropTypes.func.isRequired,
  };

  static defaultProps = {
    count: 0,
    errorText: '',

    getItemsList: () => {}
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
    const { count } = this.props;

    return (
      <div className="items-list__header">
        <div className="items-list__header-title">
          Пример мини приложения на React.JS
        </div>
        <div className="items-list__header-hint">
          <span>
            Код можно посмотреть тут -
          </span>
          <a href="https://github.com/Cast0001/code-example" target="_blank">
            Cast0001
          </a>
        </div>
        <div className="items-list__header-count">
          {`Выделено дочерних элементов: ${count}`}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="home">
        <Helmet><title>Пример кода</title></Helmet>
        {this.renderError()}
        {this.renderHeader()}
        <Controls />
        <ItemsList />
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
