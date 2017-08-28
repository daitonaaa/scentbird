import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import './Item.scss';

import Child from 'components/Child/Child';

import { deleteItemAndSetCount } from 'actions/items';


class Item extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    childs: PropTypes.array.isRequired,

    handleChangeOpenId: PropTypes.func.isRequired,
    deleteItemAndSetCount: PropTypes.func.isRequired,
  };

  static defaultProps = {
    id: -1,
    open: false,
    title: '',
    childs: [],

    handleChangeOpenId: () => {},
    deleteItemAndSetCount: () => {},
  };

  componentWillReceiveProps(nextProps) {
    const oldChilds = this.props.childs;
    const { open, childs, handleChangeOpenId } = nextProps;

    if (!Array.isArray(childs) || !Array.isArray(oldChilds)) return;

    if (open && oldChilds.length && !childs.length) {
      handleChangeOpenId(-1);
    }
  }

  renderOpenChildBtn() {
    const {
      open, childs, id, handleChangeOpenId
    } = this.props;

    if (!Array.isArray(childs)) return;

    if (childs.length) return (
      <div
        onClick={() => handleChangeOpenId(id)}
        className={classNames(
          'item__open-child-btn', { open }
        )}
      >
        {`${open ? 'Скрыть' : 'Показать'} дочерние элементы`}
      </div>
    );

    return (
      <div className="item__open-child-btn empty">
        Элементы не найдены
      </div>
    );
  }

  handleDeleteItem = id => {
    const {
      open, deleteItemAndSetCount, handleChangeOpenId
    } = this.props;

    deleteItemAndSetCount(id);
    if (open) handleChangeOpenId(-1);
  }

  renderChilds() {
    const { open, childs, id } = this.props;

    if (!Array.isArray(childs)) return;

    if (open && childs.length) {
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
      open, title, id,
    } = this.props;

    return (
      <div className="item">
        <div
          className={classNames(
            'item-box', { open }
          )}
        >
          <div className="item__title">
            {`${title} ${id}`}
          </div>
          {this.renderOpenChildBtn()}
          <div
            className="item__delete"
            onClick={() => this.handleDeleteItem(id)}
          >
            Удалить
          </div>
        </div>
        {this.renderChilds()}
      </div>
    );
  }
}


const mapDispatchToProps = {
  deleteItemAndSetCount
};

export default connect(()=>({}), mapDispatchToProps)(Item);
