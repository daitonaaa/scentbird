import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import './ItemsList.scss';

import Item from 'components/Item';


export class ItemsList extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    openedItem: PropTypes.number.isRequired,
  };

  render() {
    const {
      list,
      count,
      openedItem,
    } = this.props;

    const full = !!count;

    if (list instanceof Array && list.length) return (
      <div className="items-list">
        <div
          className={classNames('items-list__count', { full })}
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
