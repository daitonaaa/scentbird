import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';

import ItemsList from 'components/ItemsList/ItemsList';

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
    require('./Home.scss');

    const { items } = this.props;

    return (
      <div className="content">
        <Helmet>
          <title>Главная</title>
        </Helmet>
        <ItemsList {...items} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items
});

export default connect(mapStateToProps, { getItemsList })(Home);
