import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import './Child.scss';

import {
  deleteItemChildAndSetCount,
  toggleChildCheckAndSetCount,
} from 'actions/items';


class Child extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    check: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    parentId: PropTypes.number.isRequired,

    deleteItemChildAndSetCount: PropTypes.func.isRequired,
    toggleChildCheckAndSetCount: PropTypes.func.isRequired,
  };

  static defaultProps = {
    id: -1,
    check: false,
    title: '',
    parentId: -1,

    deleteItemChildAndSetCount: () => {},
    toggleChildCheckAndSetCount: () => {},
  };

  handleToggleCheck = () => {
    const {
      id,
      check,
      parentId,
      toggleChildCheckAndSetCount,
    } = this.props;

    toggleChildCheckAndSetCount(parentId, id, !check);
  }

  handleDeleteItemChild = () => {
    const {
      id,
      parentId,
      deleteItemChildAndSetCount,
    } = this.props;

    deleteItemChildAndSetCount(parentId, id);
  }

  render() {
    const {
      id,
      title,
      check,
    } = this.props;

    return (
      <div className={classNames('child', { check })}>
        <div className="child__title">
          {`${title} ${id}`}
        </div>
        <div
          onClick={this.handleToggleCheck}
          className={classNames('child__check-btn', { check })}
        >
          {check ? 'Снять выделение' : 'Выделить'}
        </div>
        <div
          className="child__delete-btn"
          onClick={this.handleDeleteItemChild}
        >
          Удалить
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = {
  deleteItemChildAndSetCount,
  toggleChildCheckAndSetCount,
};

export default connect(()=>({}), mapDispatchToProps)(Child);
