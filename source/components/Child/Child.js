import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import './Child.scss';

import {
  setCheckChildStatus,
  deleteItemChildAndSetCount,
} from 'actions/items';


class Child extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    check: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    parentId: PropTypes.number.isRequired,

    setCheckChildStatus: PropTypes.func.isRequired,
    deleteItemChildAndSetCount: PropTypes.func.isRequired,
  };

  handleToggleCheck = () => {
    const {
      id,
      check,
      parentId,
      setCheckChildStatus,
    } = this.props;

    setCheckChildStatus(parentId, id, !check);
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
          <span>{id}:</span> {title}
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
  setCheckChildStatus,
};

export default connect(
  ()=>({}),
  mapDispatchToProps
)(Child);
