import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { toggleChildCheckAndSetCount, deleteItemChildAndSetCount } from 'actions/items';


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

  render() {
    require('./Child.scss');

    const {
      title, check, id, parentId,
      toggleChildCheckAndSetCount, deleteItemChildAndSetCount
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
          className={classNames(
            'child__check-btn', { check }
          )}
          onClick={() => toggleChildCheckAndSetCount(parentId, id, !check)}
        >
          {check ? 'Снять выделение' : 'Выделить'}
        </div>
        <div
          className="child__delete-btn"
          onClick={() => deleteItemChildAndSetCount(parentId, id)}
        >
          Удалить
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = {
  toggleChildCheckAndSetCount, deleteItemChildAndSetCount
};

export default connect(()=>({}), mapDispatchToProps)(Child);
