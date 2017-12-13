import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import './ItemsList.scss';

import Item from 'components/Item';


class ItemsList extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    request: PropTypes.bool.isRequired,
    openedItem: PropTypes.number.isRequired,
  };

  static defaultProps = {
    list: [],
    count: 0,
    request: false,
    errorText: '',
    openedItem: 0,
    checkedFirst: false,
  };

  renderItems() {
    const {
      list,
      request,
      openedItem,
    } = this.props;

    return (
      <div
        className={classNames(
          'items-list__list', { 'loading': request }
        )}
      >
        {list.map(item =>
          <Item
            {...item}
            key={item.id}
            open={item.id === openedItem}
          />
        )}
      </div>
    );
  }

  render() {
    const {
      list,
      request,
    } = this.props;

    if (list instanceof Array && list.length) {

      return this.renderItems();
    }

    return (
      <div
        className={classNames(
          'items-list__list', { 'loading': request }
        )}
      >
        <div className="items-list__list-no-items">
          Элементы не найдены
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  ...state.items
});

export default connect(
  mapStateToProps
)(ItemsList);
