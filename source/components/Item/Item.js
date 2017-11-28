import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import './Item.scss';

import Child from 'components/Child';

import { deleteItemAndSetCount } from 'actions/items';


class Item extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    childs: PropTypes.array.isRequired,

    onChangeOpenId: PropTypes.func.isRequired,
    deleteItemAndSetCount: PropTypes.func.isRequired,
  };

  static defaultProps = {
    id: -1,
    open: false,
    title: '',
    childs: [],

    onChangeOpenId: () => {},
    deleteItemAndSetCount: () => {},
  };

  componentWillReceiveProps(nextProps) {
    const {
      open,
      childs,
      onChangeOpenId,
    } = nextProps;
    const oldChilds = this.props.childs;

    if (
      !open
      || !Array.isArray(childs)
      || !Array.isArray(oldChilds)
    ) return;

    if (oldChilds.length && !childs.length) {
      onChangeOpenId(-1);
    }
  }

  handleDeleteItem = () => {
    const {
      id,
      open,
      onChangeOpenId,
      deleteItemAndSetCount,
    } = this.props;

    deleteItemAndSetCount(id);
    if (open) onChangeOpenId(-1);
  }

  renderOpenChildBtn() {
    const {
      id,
      open,
      childs,
      onChangeOpenId,
    } = this.props;

    if (childs instanceof Array && childs.length) return (
      <div
        onClick={() => onChangeOpenId(id)}
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

  renderChilds() {
    const { open, childs, id } = this.props;

    if (open && childs instanceof Array) {
      return (
        <div className="item__childs">
          {childs.map(item =>
            <Child
              {...item}
              parentId={id}
              key={item.id}
            />
          )}
        </div>
      );
    }
  }

  render() {
    const {
      id,
      open,
      title,
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
            onClick={this.handleDeleteItem}
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
