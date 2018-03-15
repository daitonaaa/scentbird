import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './ItemsList.scss';

import Item from 'components/Item';


class ItemsList extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    openedItem: PropTypes.number.isRequired,
  };

  renderItems() {
    const {
      list,
      count,
      openedItem,
    } = this.props;

    return (
      <div className="items-list">
        <div
          className={classNames('items-list__count', {
            full: !!count,
          })}
        >
          Выделено дочерних элементов: <span>{count}</span>
        </div>
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
    const { list } = this.props;

    if (list instanceof Array && list.length) {

      return this.renderItems();
    }

    return (
      <div className="items-list">
        <div className="items-list__no-items">
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
