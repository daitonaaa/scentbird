import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import './Item.scss';

import Child from 'components/Child/Child';

import { deleteItem } from 'actions/items';


class Item extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    check: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    childs: PropTypes.array.isRequired,

    handleChangeOpenId: PropTypes.func.isRequired,
  };

  static defaultProps = {
    id: -1,
    open: false,
    check: false,
    title: '',
    childs: [],

    handleChangeOpenId: () => {},
  };

  renderOpenChildBtn() {
    const {
      childs, id, handleChangeOpenId
    } = this.props;

    if (childs && childs.length) return (
      <div
        onClick={() => handleChangeOpenId(id)}
        className="item__open-child-btn"
      >
        Показать дочерние элементы
      </div>
    );

    return (
      <div className="item__open-child-btn empty">
        Дочерние элементы элементы не найдены
      </div>
    );
  }

  renderChilds() {
    const { open, childs, id } = this.props;

    if (open && childs && childs.length) {
      return (
        <div className="item__childs">
          {
            childs.map(item =>
              <Child key={item.id} parentId={id} {...item} />
            )
          }
        </div>
      );
    }
  }

  render() {
    require('./Item.scss');

    const {
      open, title, check, id,
    } = this.props;

    return (
      <div
        className={classNames(
          'item', { open, check }
        )}
      >
        <div className="item__title">
          {title}
        </div>
        {this.renderOpenChildBtn()}
        <div
          className="item__delete"
          onClick={() => deleteItem(id)}
        >
          Удалить элемент
        </div>
        {this.renderChilds()}
      </div>
    );
  }
}


const mapDispatchToProps = {
  deleteItem
};

export default connect(()=>({}), mapDispatchToProps)(Item);
