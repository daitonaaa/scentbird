import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import './Item.scss';

import Child from 'components/Child';
import CreateForm from 'components/CreateForm';

import {
  setOpenId,
  resetOpenId,
  toggleItemChildsCheck,
  deleteItemAndSetCount,
} from 'actions/items';


export class Item extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    childs: PropTypes.array.isRequired,

    setOpenId: PropTypes.func.isRequired,
    resetOpenId: PropTypes.func.isRequired,
    toggleItemChildsCheck: PropTypes.func.isRequired,
    deleteItemAndSetCount: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const oldChilds = this.props.childs;
    const {
      open,
      childs,
      resetOpenId,
    } = nextProps;

    if (!Array.isArray(childs) || !Array.isArray(oldChilds)) {

      return;
    }

    if (open && oldChilds.length && !childs.length) {
      resetOpenId();
    }
  }

  getAllCheckChildStatus() {
    const { childs } = this.props;

    let checkedAll = true;

    if (childs instanceof Array && childs.length) {
      childs.forEach(item => {
        if (!item.check) checkedAll = false;
      });

      return checkedAll;
    }

    return false;
  }

  handleChangeOpenId = () => {
    const {
      id,
      open,
      setOpenId,
      resetOpenId,
    } = this.props;

    open
      ? resetOpenId()
      : setOpenId(id);
  }

  handleDeleteItem = () => {
    const {
      id,
      open,
      resetOpenId,
      deleteItemAndSetCount,
    } = this.props;

    deleteItemAndSetCount(id);
    if (open) resetOpenId();
  }

  handleCheckAllChilds = () => {
    const {
      id,
      childs,
      toggleItemChildsCheck,
    } = this.props;
    const checkedStatus = !this.getAllCheckChildStatus();

    if (childs instanceof Array && childs.length) {
      toggleItemChildsCheck(id, checkedStatus);
    }
  }

  renderOpenChildBtn() {
    const {
      open,
      childs,
    } = this.props;

    if (childs instanceof Array && childs.length) return (
      <div
        onClick={this.handleChangeOpenId}
        className={classNames(
          'item__open-child-btn', { open }
        )}
      >
        {open ? 'Закрыть' : 'Открыть'}
      </div>
    );

    return (
      <div
        onClick={this.handleChangeOpenId}
        className={classNames(
          'item__open-child-btn empty', { open }
        )}
      >
        {open ? 'Закрыть' : 'Создать'}
      </div>
    );
  }

  renderChilds() {
    const {
      id,
      childs,
    } = this.props;

    if (childs instanceof Array && childs.length) {
      return childs.map(item =>
        <Child
          {...item}
          parentId={id}
          key={item.id}
        />
      );
    }
  }

  render() {
    const {
      id,
      open,
      title,
    } = this.props;
    const checkedAllChilds = this.getAllCheckChildStatus();

    return (
      <div className={classNames('item', { open })}>
        <div className="item__box">
          <div className="item__title">
            <span>{id}:</span> {title}
          </div>
          {this.renderOpenChildBtn()}
          <div
            onClick={this.handleCheckAllChilds}
            className={classNames(
              'item__checked-childs-btn', { checked: checkedAllChilds }
            )}
          >
            {checkedAllChilds ? 'Снять выделение' : 'Выделить все'}
          </div>
          <div
            className="item__delete"
            onClick={this.handleDeleteItem}
          >
            Удалить
          </div>
        </div>
        <div className={classNames('item__childs', { open })}>
          {this.renderChilds()}
          <CreateForm
            childPosition
            parentId={id}
          />
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = {
  setOpenId,
  resetOpenId,
  toggleItemChildsCheck,
  deleteItemAndSetCount,
};

export default connect(
  ()=>({}),
  mapDispatchToProps
)(Item);
