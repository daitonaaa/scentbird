import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';

import './Home.scss';

import ItemsList from 'components/ItemsList';

import { getItemsList } from 'actions/items';


class Home extends Component {

  static propTypes = {
    items: PropTypes.object.isRequired,

    getItemsList: PropTypes.func.isRequired,
  };

  static defaultProps = {
    items: {},

    getItemsList: () => {}
  };

  componentDidMount() {
    this.props.getItemsList();
  }

  render() {
    const { items } = this.props;

    return (
      <div className="home">
        <Helmet>
          <title>
            Главная
          </title>
        </Helmet>
        <ItemsList {...items} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items
});

export default connect(
  mapStateToProps,
  { getItemsList }
)(Home);
