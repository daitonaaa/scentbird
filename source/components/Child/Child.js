import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { toggleChildCheck, deleteItemChild } from 'actions/items';


class Child extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    check: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    parentId: PropTypes.number.isRequired,

    deleteItemChild: PropTypes.func.isRequired,
    toggleChildCheck: PropTypes.func.isRequired,
  };

  static defaultProps = {
    id: -1,
    check: false,
    title: '',
    parentId: -1,

    deleteItemChild: () => {},
    toggleChildCheck: () => {},
  };

  render() {
    require('./Child.scss');

    const {
      title, check, id, parentId, toggleChildCheck, deleteItemChild
    } = this.props;

    return (
      <div
        className={classNames(
          'child', { check }
        )}
      >
        <div className="child__title">
          {title}
        </div>
        <div
          className="child__check-btn"
          onClick={() => toggleChildCheck(parentId, id, !check)}
        >
          {check ? 'Снять выделение' : 'Выделить'}
        </div>
        <div
          className="child__delete-btn"
          onClick={() => deleteItemChild(parentId, id)}
        >
          Удалить дочерний элемент
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = {
  toggleChildCheck, deleteItemChild
};

export default connect(()=>({}), mapDispatchToProps)(Child);
